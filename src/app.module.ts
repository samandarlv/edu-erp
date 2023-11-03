import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { AdminModule } from "./admin/admin.module";
import { StudentsModule } from "./students/students.module";
import { RoleModule } from './role/role.module';
import { CourseModule } from './course/course.module';
import { RoomModule } from './room/room.module';
import { TeacherModule } from './teacher/teacher.module';
import { GroupModule } from './group/group.module';
import { LessonModule } from './lesson/lesson.module';
import { StudentGroupModule } from './student_group/student_group.module';
import { LessonAttendanceModule } from './lesson_attendance/lesson_attendance.module';
import { TeacherGroupModule } from './teacher_group/teacher_group.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URI),
    StudentsModule,
    AuthModule,
    AdminModule,
    StudentsModule,
    RoleModule,
    CourseModule,
    RoomModule,
    TeacherModule,
    GroupModule,
    LessonModule,
    StudentGroupModule,
    LessonAttendanceModule,
    TeacherGroupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
