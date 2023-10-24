import { Module } from "@nestjs/common";
import { TeacherService } from "./teacher.service";
import { TeacherController } from "./teacher.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Teacher, TeacherSchema } from "./schemas/teacher.schema";
import { Auth, AuthSchema } from "src/auth/schemas/auth.schema";
import { Role, RoleSchema } from "src/role/schemas/role.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Teacher.name, schema: TeacherSchema },
      { name: Auth.name, schema: AuthSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
