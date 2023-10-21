import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";

export type RoleDocument = HydratedDocument<Role>;

@Schema({ versionKey: false })
export class Role extends Document {
  @Prop({ type: String, required: true, unique: true })
  role: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
