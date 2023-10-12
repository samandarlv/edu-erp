import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Admins")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("create")
  createAdmin(@Body() createAdminDto: CreateUserDto) {
    return this.adminService.createAdmin(createAdminDto);
  }
}
