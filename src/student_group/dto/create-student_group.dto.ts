import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateStudentGroupDto {
  @ApiProperty({ example: "id", description: "Id of student" })
  @IsString()
  @IsNotEmpty()
  student: string;

  @ApiProperty({ example: "id", description: "Id of group" })
  @IsString()
  @IsNotEmpty()
  group: string;
}
