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
import { CreateAdminDto } from "src/admin/dto/create-admin.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Admins")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: "Admin qo'shish" })
  @Post("create")
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }
}
