import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, HydratedDocument } from "mongoose";
import { Group } from "src/group/schemas/group.schema";
import { Student } from "src/students/schemas/student.schema";

export type StudentGroupDocument = HydratedDocument<StudentGroup>;

@Schema({ versionKey: false })
export class StudentGroup extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  })
  student: Student;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true })
  group: Group;

  @Prop({ type: Boolean, default: false })
  is_paid: boolean;
}

export const StudentGroupSchema = SchemaFactory.createForClass(StudentGroup);
