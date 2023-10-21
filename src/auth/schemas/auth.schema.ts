import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, HydratedDocument } from "mongoose";
import { Role } from "src/role/schemas/role.schema";

export type AuthDocument = HydratedDocument<Auth>;

@Schema({ versionKey: false })
export class Auth extends Document {
  @Prop({ type: String, required: true })
  user_id: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  role: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
