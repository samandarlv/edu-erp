import mongoose, { HydratedDocument } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "src/role/schemas/role.schema";

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true })
  role_id: Role;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
