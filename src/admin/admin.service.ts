import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, isValidObjectId } from "mongoose";
import * as bcrypt from "bcrypt";
import { Admin } from "./schemas/admin.schema";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { Auth } from "src/auth/schemas/auth.schema";
import { Role } from "src/role/schemas/role.schema";
import { UpdateAdminDto } from "./dto/update-admin.dto";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto) {
    try {
      const password = await bcrypt.hash(createAdminDto.phone, 8);
      const role = await this.roleModel.findOne({ role: "Admin" });
      if (!role) {
        throw new NotFoundException("Role not found");
      }

      const admin = await this.adminModel.create({
        ...createAdminDto,
        password,
        role_id: role._id,
      });

      (
        await this.authModel.create({
          user_id: admin._id,
          phone: admin.phone,
          password: admin.password,
          role: role.role,
        })
      ).save();

      return admin;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getAllAdmins(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const admin = await this.adminModel.find();
    const admins = await this.adminModel.find().skip(skip).limit(limit);
    return { count: admin.length, admins };
  }

  async getById(id: string) {
    if (isValidObjectId(id)) {
      throw new BadRequestException("Id is not valid");
    }

    const admin = await this.adminModel.findById(id);
    if (!admin) {
      throw new NotFoundException("Admin not found with such id");
    }

    return admin;
  }

  async updateById(id: string, updateAdminDto: UpdateAdminDto) {
    if (isValidObjectId(id)) {
      throw new BadRequestException("Id is not valid");
    }

    const admin = await this.adminModel.findById(id);
    if (!admin) {
      throw new NotFoundException("Admin not found with such id");
    }

    const updated = await this.adminModel.findByIdAndUpdate(
      id,
      updateAdminDto,
      { new: true },
    );
    if (updated) {
      return { message: "Updated successfully", admin: updated };
    }
    throw new BadRequestException("Error while updating");
  }

  async deleteById(id: string) {
    if (isValidObjectId(id)) {
      throw new BadRequestException("Id is not valid");
    }

    const admin = await this.adminModel.findById(id);
    if (!admin) {
      throw new NotFoundException("Admin not found with such id");
    }

    const deleted = await this.adminModel.findByIdAndDelete(id);
    if (deleted) {
      return { message: "Deleted successfully" };
    }
    throw new BadRequestException("Error while deleting");
  }
}
