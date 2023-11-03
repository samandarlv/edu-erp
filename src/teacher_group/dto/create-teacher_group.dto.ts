import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTeacherGroupDto {
  @ApiProperty({ example: "id", description: "Id of teacher" })
  @IsString()
  @IsNotEmpty()
  teacher_id: string;

  @ApiProperty({ example: "id", description: "Id of group" })
  @IsString()
  @IsNotEmpty()
  group_id: string;
}
