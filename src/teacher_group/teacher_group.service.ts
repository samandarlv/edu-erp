import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTeacherGroupDto } from "./dto/create-teacher_group.dto";
import { UpdateTeacherGroupDto } from "./dto/update-teacher_group.dto";
import { InjectModel } from "@nestjs/mongoose";
import { TeacherGroup } from "./schemas/teacher_group.schema";
import { Model, isValidObjectId } from "mongoose";
import { Teacher } from "src/teacher/schemas/teacher.schema";
import { Group } from "src/group/schemas/group.schema";

@Injectable()
export class TeacherGroupService {
  constructor(
    @InjectModel(TeacherGroup.name)
    private teacherGroupModel: Model<TeacherGroup>,
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
    @InjectModel(Group.name) private GroupModel: Model<Group>,
  ) {}

  async create(createTeacherGroupDto: CreateTeacherGroupDto) {
    if (!isValidObjectId(createTeacherGroupDto.teacher_id)) {
      throw new BadRequestException("Teacher id is invalid");
    } else if (!isValidObjectId(createTeacherGroupDto.group_id)) {
      throw new BadRequestException("Group id is invalid");
    }

    const teacher = await this.teacherModel.findById(
      createTeacherGroupDto.teacher_id,
    );
    if (!teacher) {
      throw new NotFoundException("Teacher not fount with such id");
    }

    const group = await this.GroupModel.findById(
      createTeacherGroupDto.group_id,
    );
    if (!group) {
      throw new NotFoundException("Group not found with such if");
    }

    const teacher_group = await this.teacherGroupModel.create(
      createTeacherGroupDto,
    );
    await teacher_group.save();

    return { message: "Teacher and group related successfully" };
  }

  async findAll() {
    const teacher_group = await this.teacherGroupModel.find();
    return teacher_group;
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Invalid id");
    }
    const teacher_group = await this.teacherGroupModel.findById(id);
    if (!teacher_group) {
      throw new NotFoundException("Not found with such id");
    }
    return teacher_group;
  }

  async update(id: string, updateTeacherGroupDto: UpdateTeacherGroupDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Invalid id");
    }
    const teacher_group = await this.teacherGroupModel.findById(id);
    if (!teacher_group) {
      throw new NotFoundException("Not found with such id");
    }

    const updated = await teacher_group.updateOne(updateTeacherGroupDto);
    return { message: "Updated successfully", updated };
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Invalid id");
    }
    const teacher_group = await this.teacherGroupModel.findById(id);
    if (!teacher_group) {
      throw new NotFoundException("Not found with such id");
    }
    await teacher_group.deleteOne();
    return { message: "Deleted successfully" };
  }
}
