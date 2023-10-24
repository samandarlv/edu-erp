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

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
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

      const new_teacher = await (
        await this.teacherModel.create(createTeacherDto)
      ).save();

      return { message: "Created successfully", teacher: new_teacher };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAll() {
    const teachers = await this.teacherModel.find().populate("course_id");

    return teachers;
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Id is not valid");
    }

    const teacher = await this.teacherModel
      .findOne({ _id: id })
      .populate("course_id");

    if (!teacher) {
      throw new NotFoundException("Teacher not found with such id");
    }
    return teacher;
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Id is not valid");
    }

    const teacher = await this.teacherModel.findByIdAndUpdate(
      id,
      updateTeacherDto,
      {
        new: true,
      },
    );

    if (!teacher) {
      throw new BadRequestException();
    }

    return { message: "Updated successfully", teacher };
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
