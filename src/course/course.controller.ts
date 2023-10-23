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
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Course")
@Controller("course")
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post("create")
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get("get-courses")
  findAll(@Query("page") page: number, @Query("limit") limit: number) {
    return this.courseService.findAll(page, limit);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.courseService.remove(+id);
  }
}
