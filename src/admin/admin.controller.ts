import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "src/admin/dto/create-admin.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UpdateAdminDto } from "./dto/update-admin.dto";

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

  @ApiOperation({ summary: "Get Admin by id" })
  @Get("get/:id")
  getAdminById(@Param("id") id: string) {
    return this.adminService.getById(id);
  }

  @ApiOperation({ summary: "Update Admin by id" })
  @Put("delete/:id")
  updateAdminById(@Param("id") id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateById(id, updateAdminDto);
  }

  @ApiOperation({ summary: "Delete Admin by id" })
  @Delete("delete/:id")
  deleteAdminById(@Param("id") id: string) {
    return this.adminService.deleteById(id);
  }
}
