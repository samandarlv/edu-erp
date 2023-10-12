import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/users/schemas/user.schema";
import { LoginDto } from "./dto/login.dot";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private authModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.authModel.findOne({ phone: loginDto.phone });

    if (!user) {
      throw new BadRequestException("Phone number or password is incorrect");
    }
    const is_equal = await bcrypt.compare(loginDto.password, user.password);

    if (!is_equal) {
      throw new BadRequestException("Phone number or password is incorrect");
    }

    const { access_token, refresh_token } = await this.getTokens(user);

    user.refresh_token = await bcrypt.hash(refresh_token, 8);
    user.save();

    const response = {
      message: `${user.role} logged in successfully`,
      role: user.role,
      tokens: [access_token, refresh_token],
    };

    console.log(user);

    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const data = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!data) {
      throw new ForbiddenException("User not found");
    }
    const updated = await this.authModel.updateOne(
      { refresh_token: refreshToken },
      { $set: { refresh_token: null } },
    );
    res.clearCookie("refresh_token");
    const response = {
      message: "User logged out successfully",
    };
    console.log(updated);
    return response;
  }

  async getTokens(user: UserDocument) {
    const payload = { id: user._id };

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
