import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { GroupService } from "./group.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Group")
@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post("create")
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get("get-all")
  findAll() {
    return this.groupService.findAll();
  }
  @ApiOperation({ summary: "Get one group by id" })
  @Get("get/:id")
  findOne(@Param("id") id: string) {
    return this.groupService.findOne(id);
  }

  @ApiOperation({ summary: "Update group by id" })
  @Patch("update/:id")
  update(@Param("id") id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @ApiOperation({ summary: "Delete group by id" })
  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.groupService.remove(id);
  }
}
