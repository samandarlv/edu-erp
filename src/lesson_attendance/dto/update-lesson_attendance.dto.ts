import { PartialType } from '@nestjs/swagger';
import { CreateLessonAttendanceDto } from './create-lesson_attendance.dto';

export class UpdateLessonAttendanceDto extends PartialType(CreateLessonAttendanceDto) {}
