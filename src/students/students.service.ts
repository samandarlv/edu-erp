import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Student } from "./schemas/student.schema";

@Injectable()
export class StudentsService {
  @InjectModel(Student.name) studentModel: Model<Student>;
  create(createStudentDto) {
    return "This action adds a new student";
  }

  async findAll() {
    const students = this.studentModel.find({ role: "Student" });
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
