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
import { StudentsService } from "./students.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Students")
@Controller("students")
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiOperation({ summary: "Create a new student" })
  @Post("create")
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @ApiOperation({ summary: "Get all students" })
  @Get("get-all")
  findAll(@Query("page") page: string, @Query("limit") limit: string) {
    return this.studentsService.findAll(+page, +limit);
  }

  @ApiOperation({ summary: "Get student by id" })
  @Get("get/:id")
  findOne(@Param("id") id: string) {
    return this.studentsService.findOne(id);
  }

  @ApiOperation({ summary: "Update student by id" })
  @Patch("update/:id")
  update(@Param("id") id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @ApiOperation({ summary: "Delete student by id" })
  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.studentsService.remove(id);
  }
}
