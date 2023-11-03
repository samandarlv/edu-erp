import { Module } from "@nestjs/common";
import { TeacherGroupService } from "./teacher_group.service";
import { TeacherGroupController } from "./teacher_group.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  TeacherGroup,
  TeacherGroupSchema,
} from "./schemas/teacher_group.schema";
import { Teacher, TeacherSchema } from "src/teacher/schemas/teacher.schema";
import { Group, GroupSchema } from "src/group/schemas/group.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeacherGroup.name, schema: TeacherGroupSchema },
      { name: Teacher.name, schema: TeacherSchema },
      { name: Group.name, schema: GroupSchema },
    ]),
  ],
  controllers: [TeacherGroupController],
  providers: [TeacherGroupService],
})
export class TeacherGroupModule {}
