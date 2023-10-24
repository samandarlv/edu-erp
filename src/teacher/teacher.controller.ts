import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { TeacherService } from "./teacher.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Teacher")
@Controller("teacher")
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @ApiOperation({ summary: "Create teacher" })
  @Post("create")
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @ApiOperation({ summary: "Get all teachers" })
  @Get("get-all")
  findAll(@Query("page") page: number, @Query("limit") limit: number) {
    return this.teacherService.findAll(page, limit);
  }

  @ApiOperation({ summary: "Get teacher by id" })
  @Get("get/:id")
  findOne(@Param("id") id: string) {
    return this.teacherService.findOne(id);
  }

  @ApiOperation({ summary: "Update teacher by id" })
  @Put("update/:id")
  update(@Param("id") id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @ApiOperation({ summary: "Delete teacher by id" })
  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.teacherService.remove(id);
  }
}
