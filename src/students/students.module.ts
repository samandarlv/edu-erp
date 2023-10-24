import { Module } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { StudentsController } from "./students.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Student, StudentSchema } from "./schemas/student.schema";
import { Role, RoleSchema } from "src/role/schemas/role.schema";
import { Auth, AuthSchema } from "src/auth/schemas/auth.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: Auth.name, schema: AuthSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
