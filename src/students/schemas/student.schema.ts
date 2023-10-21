import { HydratedDocument } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type StudentDocument = HydratedDocument<Student>;

@Schema({ versionKey: false })
export class Student {
  @Prop({ type: String, required: true })
  first_name: string;

  @Prop({ type: String, required: true })
  last_name: string;

  @Prop({ type: String, required: true, unique: true })
  phone: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  role: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
