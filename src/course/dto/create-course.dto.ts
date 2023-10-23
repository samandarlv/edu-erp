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
  @Min(20)
  total_lessons: string;

  @ApiProperty({ example: 3, description: "Duration of course, in months" })
  @IsNumber()
  @Max(8)
  @Min(3)
  duration: string;

  @ApiProperty({ example: 110, description: "Price of course" })
  @IsNumber()
  price: string;
}
