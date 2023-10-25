import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, HydratedDocument } from "mongoose";
import { Admin } from "src/admin/schemas/admin.schema";
import { Group } from "src/group/schemas/group.schema";
import { Teacher } from "src/teacher/schemas/teacher.schema";

export type LessonDocument = HydratedDocument<Lesson>;

@Schema({ versionKey: false })
export class Lesson extends Document {
  @Prop({ type: String })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true })
  group: Group;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  })
  teacher: Teacher;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: Boolean, required: true })
  is_done: boolean;

  @Prop({ type: String })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Admin" })
  admin: Admin;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
