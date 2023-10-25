import { Injectable } from '@nestjs/common';
import { CreateLessonAttendanceDto } from './dto/create-lesson_attendance.dto';
import { UpdateLessonAttendanceDto } from './dto/update-lesson_attendance.dto';

@Injectable()
export class LessonAttendanceService {
  create(createLessonAttendanceDto: CreateLessonAttendanceDto) {
    return 'This action adds a new lessonAttendance';
  }

  findAll() {
    return `This action returns all lessonAttendance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lessonAttendance`;
  }

  update(id: number, updateLessonAttendanceDto: UpdateLessonAttendanceDto) {
    return `This action updates a #${id} lessonAttendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} lessonAttendance`;
  }
}
