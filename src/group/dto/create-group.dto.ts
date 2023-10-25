import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from "class-validator";

export class CreateGroupDto {
  @ApiProperty({ example: "English", description: "Name of course" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "id", description: "Id of teacher" })
  @IsString()
  @IsNotEmpty()
  teacher: string;

  @ApiProperty({ example: "id", description: "Id of course" })
  @IsString()
  @IsNotEmpty()
  course: string;

  @ApiProperty({ example: "id", description: "Id of room" })
  @IsString()
  @IsNotEmpty()
  room: string;

  @ApiProperty({ example: "2023.01.01", description: "Starting date of group" })
  @IsDateString()
  @IsNotEmpty()
  start_date: Date;

  @ApiProperty({
    example: 360,
    description: "Start time of group's lessons",
  })
  @IsNumber()
  @Min(480)
  @Max(1200)
  start_time: number;

  @ApiProperty({
    example: 360,
    description: "End time of group's lessons",
  })
  @IsNumber()
  @Min(540)
  @Max(1320)
  end_time: number;
}
