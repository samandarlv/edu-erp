import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, HydratedDocument } from "mongoose";

export type CourseDocument = HydratedDocument<Course>;

@Schema({ versionKey: false })
export class Course extends Document {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: Number, required: true })
  total_lessons: number;

  @Prop({ type: Number, required: true })
  price: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
