import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "src/admin/dto/create-admin.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: "Create a new Admin" })
  @Post("create")
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @ApiOperation({ summary: "Get all Admins" })
  @Get("get-admins")
  getAllAdmins(@Query("page") page: number, @Query("limit") limit: number) {
    return this.adminService.getAllAdmins(page, limit);
  }
}
