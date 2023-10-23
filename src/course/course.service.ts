import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Course } from "./schemas/course.schema";
import { Model } from "mongoose";

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      const course = await this.courseModel.findOne({
        name: createCourseDto.name,
      });

      if (course) {
        throw new BadRequestException("Course with such name already exists");
      }

      const new_course = await (
        await this.courseModel.create(createCourseDto)
      ).save();

      return { message: "Course created successfully", course: new_course };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const course = await this.courseModel.find();
    const courses = await this.courseModel.find().skip(skip).limit(limit);

    return { count: course.length, courses };
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
