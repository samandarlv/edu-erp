import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, HydratedDocument } from "mongoose";
import { Course } from "src/course/schemas/course.schema";

export type TeacherDocument = HydratedDocument<Teacher>;

@Schema({ versionKey: false })
export class Teacher extends Document {
  @Prop({ type: String, required: true })
  first_name: string;

  @Prop({ type: String, required: true })
  last_name: string;

  @Prop({ type: String, required: true, unique: true })
  phone: string;

  @Prop({ type: String })
  image: string;

  @Prop({ type: String })
  qualifications: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true })
  course_id: Course;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
