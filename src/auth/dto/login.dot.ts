import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class LoginDto {
  @ApiProperty({
    example: "+998-90-123-45-67",
    description: "User's phone number",
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+998-\d{2}-\d{3}-\d{4}$/, {
    message: "Phone number should be in the format +998-XX-XXX-XXXX",
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
