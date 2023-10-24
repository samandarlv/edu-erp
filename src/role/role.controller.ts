import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Role")
@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: "Create a new role" })
  @Post("create")
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: "Get all roles" })
  @Get("get-all")
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOperation({ summary: "Get role by id" })
  @Get("get/:id")
  findOne(@Param("id") id: string) {
    return this.roleService.findOne(id);
  }

  @ApiOperation({ summary: "Update role by id" })
  @Patch("update/:id")
  update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @ApiOperation({ summary: "Delete role by id" })
  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.roleService.remove(id);
  }
}
