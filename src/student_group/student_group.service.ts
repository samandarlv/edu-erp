import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateStudentGroupDto } from "./dto/create-student_group.dto";
import { UpdateStudentGroupDto } from "./dto/update-student_group.dto";
import { InjectModel } from "@nestjs/mongoose";
import { StudentGroup } from "./schemas/student_group.schema";
import { Model } from "mongoose";
import { Student } from "src/students/schemas/student.schema";
import { Group } from "src/group/schemas/group.schema";
import { Lesson } from "src/lesson/schemas/lesson.schema";
import { LessonAttendance } from "src/lesson_attendance/schemas/lesson_attendance.schema";

@Injectable()
export class StudentGroupService {
  constructor(
    @InjectModel(StudentGroup.name)
    private studentGroupModel: Model<StudentGroup>,
    @InjectModel(Lesson.name) private lessonModel: Model<Lesson>,
    @InjectModel(LessonAttendance.name)
    private lessonAttendanceModel: Model<LessonAttendance>,
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Group.name) private groupModel: Model<Group>,
  ) {}

  async create(createStudentGroupDto: CreateStudentGroupDto) {
    try {
      const student_group = await (
        await this.studentGroupModel.create(createStudentGroupDto)
      ).save();

      const lessons = await this.lessonModel.find({
        group: createStudentGroupDto.group,
      });

      lessons.forEach(async (lesson) => {
        await this.lessonAttendanceModel.create({
          lesson: lesson._id,
          student: createStudentGroupDto.student,
          group: createStudentGroupDto.group,
        });
      });

      return student_group;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  findAll() {
    return `This action returns all studentGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentGroup`;
  }

  update(id: number, updateStudentGroupDto: UpdateStudentGroupDto) {
    return `This action updates a #${id} studentGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentGroup`;
  }
}
