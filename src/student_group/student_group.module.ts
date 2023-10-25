import { Module } from "@nestjs/common";
import { StudentGroupService } from "./student_group.service";
import { StudentGroupController } from "./student_group.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  StudentGroup,
  StudentGroupSchema,
} from "./schemas/student_group.schema";
import { Lesson, LessonSchema } from "src/lesson/schemas/lesson.schema";
import { Student, StudentSchema } from "src/students/schemas/student.schema";
import { Group, GroupSchema } from "src/group/schemas/group.schema";
import {
  LessonAttendance,
  LessonAttendanceSchema,
} from "src/lesson_attendance/schemas/lesson_attendance.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StudentGroup.name, schema: StudentGroupSchema },
      { name: Lesson.name, schema: LessonSchema },
      { name: LessonAttendance.name, schema: LessonAttendanceSchema },
      { name: Student.name, schema: StudentSchema },
      { name: Group.name, schema: GroupSchema },
    ]),
  ],
  controllers: [StudentGroupController],
  providers: [StudentGroupService],
})
export class StudentGroupModule {}
