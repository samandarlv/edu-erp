import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LessonAttendanceService } from './lesson_attendance.service';
import { CreateLessonAttendanceDto } from './dto/create-lesson_attendance.dto';
import { UpdateLessonAttendanceDto } from './dto/update-lesson_attendance.dto';

@Controller('lesson-attendance')
export class LessonAttendanceController {
  constructor(private readonly lessonAttendanceService: LessonAttendanceService) {}

  @Post()
  create(@Body() createLessonAttendanceDto: CreateLessonAttendanceDto) {
    return this.lessonAttendanceService.create(createLessonAttendanceDto);
  }

  @Get()
  findAll() {
    return this.lessonAttendanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonAttendanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonAttendanceDto: UpdateLessonAttendanceDto) {
    return this.lessonAttendanceService.update(+id, updateLessonAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonAttendanceService.remove(+id);
  }
}
