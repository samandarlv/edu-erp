import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Role } from "./schemas/role.schema";
import { Model, isValidObjectId } from "mongoose";

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = await this.roleModel.findOne({ role: createRoleDto.role });
      if (role) {
        throw new BadRequestException("Role with such role already exists");
      }

      const new_role = await (
        await this.roleModel.create(createRoleDto)
      ).save();

      return { message: "Created successfully", role: new_role };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAll() {
    const roles = await this.roleModel.find();
    return roles;
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Id is not valid");
    }

    const role = await this.roleModel.findById(id);
    if (!role) {
      throw new NotFoundException("Role not found with such id");
    }

    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Id is not valid");
    }

    const role = await this.roleModel.findById(id);
    if (!role) {
      throw new NotFoundException("Role not found with such id");
    }
    await role.updateOne(updateRoleDto);
    return { message: "Updated successfully", role };
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Id is not valid");
    }

    const role = await this.roleModel.findById(id);
    if (!role) {
      throw new NotFoundException("Role not found with such id");
    }
    await role.deleteOne();
    return { message: "Deleted successfully" };
  }
}
