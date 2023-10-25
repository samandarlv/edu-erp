import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateCourseDto {
  @ApiProperty({ example: "Beginnner", description: "Name of course" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 12, description: "Total number of lessons" })
  @IsNumber()
  @Max(35)
  @Min(10)
  total_lessons: string;

  @ApiProperty({ example: 110, description: "Price of course" })
  @IsNumber()
  price: string;
}
