import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Course } from "./schemas/course.schema";
import { Model, isValidObjectId } from "mongoose";

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

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Id is not valid");
    }

    const course = await this.courseModel.findById(id);
    if (!course) {
      throw new NotFoundException("Course not found with such id");
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.findOne(id);
    if (!course) {
      throw new NotFoundException("Course not found with such id");
    }

    const updated = await this.courseModel.findByIdAndUpdate(
      id,
      updateCourseDto,
      { new: true },
    );
    if (!updated) {
      throw new BadRequestException("Error while updating");
    }

    return { message: "Updated successfully", course: updated };
  }

  async remove(id: string) {
    const course = await this.findOne(id);
    if (!course) {
      throw new NotFoundException("Course not found with such id");
    }

    const deleted = await this.courseModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new BadRequestException("Error while deleting");
    }
    return { message: "Deleted succesfully" };
  }
}
