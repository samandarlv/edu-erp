import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, HydratedDocument } from "mongoose";
import { Admin } from "src/admin/schemas/admin.schema";
import { Group } from "src/group/schemas/group.schema";
import { Lesson } from "src/lesson/schemas/lesson.schema";
import { Student } from "src/students/schemas/student.schema";

export type LessonAttendanceDocument = HydratedDocument<LessonAttendance>;

@Schema({ versionKey: false })
export class LessonAttendance extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true })
  lesson: Lesson;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true })
  group: Group;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  })
  student: Student;

  @Prop({ type: Boolean, default: true })
  is_attended: boolean;

  @Prop({ type: String })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Admin" })
  admin: Admin;
}

export const LessonAttendanceSchema =
  SchemaFactory.createForClass(LessonAttendance);
