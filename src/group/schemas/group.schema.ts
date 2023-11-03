import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, HydratedDocument } from "mongoose";
import { Course } from "src/course/schemas/course.schema";
import { Room } from "src/room/schemas/room.schema";
import { Teacher } from "src/teacher/schemas/teacher.schema";

export type GroupDocument = HydratedDocument<Group>;

@Schema({ versionKey: false })
export class Group extends Document {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  })
  course: Course;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  })
  room: Room;

  @Prop({ type: Date, required: true })
  start_date: Date;

  @Prop({ type: Date, required: true })
  end_date: Date;

  @Prop({ type: Number, required: true })
  start_time: number;

  @Prop({ type: Number, required: true })
  end_time: number;

  @Prop({ type: Boolean, required: true })
  status: boolean;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
