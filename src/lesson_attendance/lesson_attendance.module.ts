import { Module } from '@nestjs/common';
import { LessonAttendanceService } from './lesson_attendance.service';
import { LessonAttendanceController } from './lesson_attendance.controller';

@Module({
  controllers: [LessonAttendanceController],
  providers: [LessonAttendanceService],
})
export class LessonAttendanceModule {}
