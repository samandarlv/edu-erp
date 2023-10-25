import mongoose, { Document, HydratedDocument } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "src/role/schemas/role.schema";

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ versionKey: false })
export class Admin extends Document {
  @Prop({ type: String, required: true })
  first_name: string;

  @Prop({ type: String, required: true })
  last_name: string;

  @Prop({ type: String, required: true, unique: true })
  phone: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true })
  role: Role;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
