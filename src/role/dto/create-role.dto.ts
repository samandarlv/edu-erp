import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ example: "Student", description: "User's role" })
  @IsString()
  @IsNotEmpty()
  role: string;
}
