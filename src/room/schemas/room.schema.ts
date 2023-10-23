import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";

export type RoomDocument = HydratedDocument<Room>;

@Schema({ versionKey: false })
export class Room extends Document {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: Number, required: true })
  size: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
