import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Teacher } from "./schemas/teacher.schema";
import { Model, isValidObjectId } from "mongoose";
import { Auth } from "src/auth/schemas/auth.schema";
import * as bcrypt from "bcrypt";
import { Role } from "src/role/schemas/role.schema";

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    try {
      const teacher = await this.teacherModel.findOne({
        phone: createTeacherDto.phone,
      });

      if (teacher) {
        throw new BadRequestException(
          "Teacher with such phone number already exists",
        );
      }

      const role = await this.roleModel.findOne({ role: "Teacher" });
      if (!role) {
        throw new NotFoundException("Role not found");
      }

      const password = await bcrypt.hash(createTeacherDto.phone, 8);

      const new_teacher = await (
        await this.teacherModel.create({
          ...createTeacherDto,
          password,
          role: role._id,
        })
      ).save();

      await (
        await this.authModel.create({
          user: new_teacher._id,
          phone: new_teacher.phone,
          password: new_teacher.password,
          role: role.role,
        })
      ).save();

      return { message: "Created successfully", teacher: new_teacher };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const count = await this.teacherModel.find();
    const teachers = await this.teacherModel
      .find()
      .skip(skip)
      .limit(limit)
      .populate("course");

    return { count, teachers };
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Id is not valid");
    }

    const teacher = await this.teacherModel
      .findOne({ _id: id })
      .populate("course");

    if (!teacher) {
      throw new NotFoundException("Teacher not found with such id");
    }
    return teacher;
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Id is not valid");
    }

    const teacher = await this.teacherModel.findById(id);
    if (!teacher) {
      throw new NotFoundException("Teacher not found with such id");
    }

    const updated = await this.teacherModel.findByIdAndUpdate(
      id,
      updateTeacherDto,
      { new: true },
    );

    if (!updated) {
      throw new BadRequestException("Error while updating");
    }

    return { message: "Updated successfully", teacher: updated };
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Is is not valid");
    }

    const teacher = await this.teacherModel.findById(id);
    if (!teacher) {
      throw new NotFoundException("Teacher not found with such id");
    }

    const deleted = await this.teacherModel.findByIdAndDelete(id);
    if (deleted) {
      return { message: "Deleted successfully" };
    }
    throw new BadRequestException("Error while deleting");
  }
}
