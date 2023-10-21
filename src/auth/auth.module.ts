import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { Auth, AuthSchema } from "./schemas/auth.schema";
import { Admin, AdminSchema } from "src/admin/schemas/admin.schema";
import { Student, StudentSchema } from "src/students/schemas/student.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: Admin.name, schema: AdminSchema },
      { name: Student.name, schema: StudentSchema },
    ]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
