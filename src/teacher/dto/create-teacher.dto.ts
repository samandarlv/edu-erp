import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTeacherDto {
  @ApiProperty({ example: "John", description: "Teacher's first name" })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: "Doe", description: "Teacher's last name" })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Teacher's phone number",
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: ".png, .jpg", description: "Teacher's image" })
  image: string;

  @ApiProperty({
    example: "6535ebe1513e8b21ead29dd7",
    description: "Id of course which teacher teaches",
  })
  @IsString()
  @IsNotEmpty()
  course_id: string;
}
