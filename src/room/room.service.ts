import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Room } from "./schemas/room.schema";
import { Model, isValidObjectId } from "mongoose";

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async create(createRoomDto: CreateRoomDto) {
    try {
      const room = await this.roomModel.findOne({ name: createRoomDto.name });
      if (room) {
        throw new BadRequestException("Room already exists with such name");
      }
      const new_room = await (
        await this.roomModel.create(createRoomDto)
      ).save();

      return { message: "Created successfully", room: new_room };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    const rooms = await this.roomModel.find();
    return rooms;
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Id is not valid");
    }

    const room = await this.roomModel.findById(id);
    if (!room) {
      throw new NotFoundException("Room not found with such id");
    }

    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Id is not valid");
    }

    const room = await this.roomModel.findById(id);
    if (!room) {
      throw new NotFoundException("Room not found with such id");
    }
    await room.updateOne(updateRoomDto);

    return { message: "Updated successfully", room };
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Id is not valid");
    }

    const room = await this.roomModel.findById(id);
    if (!room) {
      throw new NotFoundException("Room not found with such id");
    }
    await room.deleteOne();

    return { message: "Deleted successfull" };
  }
}
