import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TeacherGroupService } from "./teacher_group.service";
import { CreateTeacherGroupDto } from "./dto/create-teacher_group.dto";
import { UpdateTeacherGroupDto } from "./dto/update-teacher_group.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Teacher Group")
@Controller("teacher-group")
export class TeacherGroupController {
  constructor(private readonly teacherGroupService: TeacherGroupService) {}

  @ApiOperation({ summary: "Add teacher to group" })
  @Post()
  create(@Body() createTeacherGroupDto: CreateTeacherGroupDto) {
    return this.teacherGroupService.create(createTeacherGroupDto);
  }

  @ApiOperation({ summary: "Get all" })
  @Get()
  findAll() {
    return this.teacherGroupService.findAll();
  }

  @ApiOperation({ summary: "Get by id" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.teacherGroupService.findOne(id);
  }

  @ApiOperation({ summary: "Update by id" })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTeacherGroupDto: UpdateTeacherGroupDto,
  ) {
    return this.teacherGroupService.update(id, updateTeacherGroupDto);
  }

  @ApiOperation({ summary: "Delete by id" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.teacherGroupService.remove(id);
  }
}
