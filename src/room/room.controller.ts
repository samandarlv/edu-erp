import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RoomService } from "./room.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Room")
@Controller("room")
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiOperation({ summary: "Create a new room" })
  @Post("create")
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @ApiOperation({ summary: "Get all romms" })
  @Get("get-all")
  findAll() {
    return this.roomService.findAll();
  }

  @ApiOperation({ summary: "Get romm by id" })
  @Get("get/:id")
  findOne(@Param("id") id: string) {
    return this.roomService.findOne(id);
  }

  @ApiOperation({ summary: "Update romm by id" })
  @Patch("update/:id")
  update(@Param("id") id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @ApiOperation({ summary: "Delete romm by id" })
  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.roomService.remove(id);
  }
}
