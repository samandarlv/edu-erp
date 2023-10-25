import { Module } from "@nestjs/common";
import { GroupService } from "./group.service";
import { GroupController } from "./group.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Group, GroupSchema } from "./schemas/group.schema";
import { Lesson, LessonSchema } from "src/lesson/schemas/lesson.schema";
import { Course, CourseSchema } from "src/course/schemas/course.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Group.name, schema: GroupSchema },
      { name: Lesson.name, schema: LessonSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
