import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Group } from "./schemas/group.schema";
import { Model } from "mongoose";
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
          teacher: new_group.teacher,
          date,
          is_done: true,
        });
      });

      return new_group;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    const groups = await this.groupModel.find().populate("teacher course room");
    return groups;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
