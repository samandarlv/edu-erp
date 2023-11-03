import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Group } from "./schemas/group.schema";
import { Model, isValidObjectId } from "mongoose";
import { Lesson } from "src/lesson/schemas/lesson.schema";
import { Course } from "src/course/schemas/course.schema";
import getDates from "src/utils/generate-dates";

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<Group>,
    @InjectModel(Lesson.name) private lessonModel: Model<Lesson>,
    @InjectModel(Course.name) private courseModel: Model<Course>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    try {
      const group = await this.groupModel.findOne({
        name: createGroupDto.name,
      });
      if (group) {
        throw new BadRequestException("Group already exists with such name");
      }
      const course = await this.courseModel.findById(createGroupDto.course);
      if (!course) {
        throw new NotFoundException("Course not found with such id");
      }
      const dates = getDates(createGroupDto.start_date, course.total_lessons, [
        "Monday",
        "Wednesday",
        "Friday",
      ]);

      const new_group = await this.groupModel.create({
        ...createGroupDto,
        end_date: dates[dates.length - 1],
        status: true,
      });

      await new_group.save();

      dates.forEach(async (date) => {
        await this.lessonModel.create({
          group: new_group._id,
          date,
          is_done: true,
        });
      });

      return { message: "Created successfully", group: new_group };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    const groups = await this.groupModel.find().populate("teacher course room");
    return groups;
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Id is not valid");
    }

    const group = await this.groupModel.findById(id);
    if (!group) {
      throw new NotFoundException("Group not found with such id");
    }

    return group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const group = await this.findOne(id);
    await group.updateOne(updateGroupDto);
    return { message: "Updated successfully", group };
  }

  async remove(id: string) {
    const group = await this.findOne(id);
    await group.deleteOne();
    return { message: "Deleted succesfully" };
  }
}
