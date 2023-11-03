import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, HydratedDocument } from "mongoose";
import { Group } from "src/group/schemas/group.schema";
import { Teacher } from "src/teacher/schemas/teacher.schema";

export type TeacherGroupDocumet = HydratedDocument<TeacherGroup>;

Schema({ versionKey: false });
export class TeacherGroup extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  })
  teacher_id: Teacher;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true })
  group_id: Group;
}

export const TeacherGroupSchema = SchemaFactory.createForClass(TeacherGroup);
 