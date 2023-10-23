import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LoginDto } from "./dto/login.dot";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { Auth, AuthDocument } from "./schemas/auth.schema";
import { Admin } from "src/admin/schemas/admin.schema";
import { Student } from "src/students/schemas/student.schema";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    @InjectModel(Student.name) private studentModel: Model<Student>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto, res: Response) {
    const user = await this.authModel.findOne({ phone: loginDto.phone });

    console.log(user);

    if (!user) {
      throw new BadRequestException("Phone number or password is incorrect");
    }

    if (user.role === "Admin") {
      const admin = await this.adminModel.findOne({ phone: loginDto.phone });
      if (!admin) {
        await this.authModel.deleteOne({ _id: user._id });
        throw new NotFoundException("Phone number or password is incorrect");
      }
    } else if (user.role === "Student") {
      const student = await this.studentModel.findOne({
        phone: loginDto.phone,
      });
      if (!student) {
        await this.authModel.deleteOne({ _id: loginDto.phone });
      }
    }

    const is_equal = await bcrypt.compare(loginDto.password, user.password);

    if (!is_equal) {
      throw new BadRequestException("Phone number or password is incorrect");
    }

    const { access_token, refresh_token } = await this.getTokens(user);

    res.cookie("refresh_token", refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: `${user.role} logged in successfully`,
      role: user.role,
      tokens: { access_token, refresh_token },
    };

    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const data = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!data) {
      throw new ForbiddenException("User not found");
    }

    res.clearCookie("refresh_token");
    const response = {
      message: `${data.payload.role} logged out successfully`,
    };
    return response;
  }

  async getTokens(user: AuthDocument) {
    const payload = { id: user._id, role: user.role };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        { payload },
        {
          secret: process.env.ACCESS_TOKEN_KEY,
          expiresIn: process.env.ACCESS_TOKEN_TIME,
        },
      ),

      this.jwtService.signAsync(
        { payload },
        {
          secret: process.env.REFRESH_TOKEN_KEY,
          expiresIn: process.env.REFRESH_TOKEN_TIME,
        },
      ),
    ]);

    return { access_token, refresh_token };
  }
}
