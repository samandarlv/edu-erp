import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/schemas/user.schema";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createAdmin(createAdminDto: CreateUserDto) {
    const password = await bcrypt.hash(createAdminDto.phone, 8);
    const role = "Admin";
    const admin = await (
      await this.userModel.create({ ...createAdminDto, password, role })
    ).save();
    console.log(admin);

    return admin;
  }
}
