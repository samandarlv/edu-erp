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
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Course")
@Controller("course")
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiOperation({ summary: "Create new course" })
  @Post("create")
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @ApiOperation({ summary: "Get all courses" })
  @Get("get-courses")
  findAll(@Query("page") page: number, @Query("limit") limit: number) {
    return this.courseService.findAll(page, limit);
  }

  @ApiOperation({ summary: "Get course by id" })
  @Get("get/:id")
  findOne(@Param("id") id: string) {
    return this.courseService.findOne(id);
  }

  @ApiOperation({ summary: "Update course by id" })
  @Patch("update/:id")
  update(@Param("id") id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @ApiOperation({ summary: "Delete course by id" })
  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.courseService.remove(id);
  }
}
