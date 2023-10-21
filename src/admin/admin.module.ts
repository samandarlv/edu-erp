import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Admin, AdminSchema } from "../admin/schemas/admin.schema";
import { Auth, AuthSchema } from "src/auth/schemas/auth.schema";
import { Role, RoleSchema } from "src/role/schemas/role.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: Auth.name, schema: AuthSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
