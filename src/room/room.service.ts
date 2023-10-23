import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Room } from "./schemas/room.schema";
import { Model } from "mongoose";

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

  findAll() {
    return `This action returns all room`;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
