import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from "@nestjs/common";
import { TeacherService } from "./teacher.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";

@Controller("teacher")
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post("create")
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get("get-all")
  findAll() {
    return this.teacherService.findAll();
  }

  @Get("get/:id")
  findOne(@Param("id") id: string) {
    return this.teacherService.findOne(id);
  }

  @Put("update/:id")
  update(@Param("id") id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.teacherService.remove(id);
  }
}
