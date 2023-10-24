import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, isValidObjectId } from "mongoose";
import { Student } from "./schemas/student.schema";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import * as bcrypt from "bcrypt";
import { Role } from "src/role/schemas/role.schema";
import { Auth } from "src/auth/schemas/auth.schema";

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Auth.name) private authModel: Model<Auth>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const student = await this.studentModel.findOne({
      phone: createStudentDto.phone,
    });
    if (student) {
      throw new BadRequestException("Student already exists with such name");
    }
    const password = await bcrypt.hash(createStudentDto.phone, 8);
    const role = await this.roleModel.findOne({ role: "Student" });
    if (!role) {
      throw new NotFoundException("Role not found");
    }

    const new_student = await (
      await this.studentModel.create({
        ...createStudentDto,
        password,
        role_id: role._id,
      })
    ).save();

    await (
      await this.authModel.create({
        user_id: new_student._id,
        phone: new_student.phone,
        password: new_student.password,
        role: role.role,
      })
    ).save();
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const count = this.studentModel.find();
    const students = this.studentModel.find().skip(skip).limit(limit);
    return { count, students };
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Id is not valid");
    }

    const student = await this.studentModel.findById(id);
    if (!student) {
      throw new NotFoundException("Student not found with such id");
    }
    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Id is not valid");
    }

    const student = await this.studentModel.findById(id);
    if (!student) {
      throw new NotFoundException("Student not found with such id");
    }
    await student.updateOne(updateStudentDto);

    return { message: "Updated successfully", student };
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Id is not valid");
    }

    const student = await this.studentModel.findById(id);
    if (!student) {
      throw new NotFoundException("Student not found with such id");
    }
    await student.deleteOne();

    return { message: "Deleted successfully" };
  }
}
