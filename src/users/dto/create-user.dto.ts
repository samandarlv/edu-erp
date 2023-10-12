import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "Ali", description: "User's name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "Aliyev", description: "User's surname" })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty({
    example: "+998-90-123-45-67",
    description: "User's phone number",
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+998-\d{2}-\d{3}-\d{4}$/, {
    message: "Phone number should be in the format +998-XX-XXX-XXXX",
  })
  phone: string;

  @ApiProperty({ example: "example@gmail.com", description: "User's email" })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
