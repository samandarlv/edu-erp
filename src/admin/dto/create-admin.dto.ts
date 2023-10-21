import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({ example: "Ali", description: "Admin's name" })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: "Aliyev", description: "Admin's surname" })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: "+998-90-123-45-67",
    description: "Admin's phone number",
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+998-\d{2}-\d{3}-\d{4}$/, {
    message: "Phone number should be in the format +998-XX-XXX-XXXX",
  })
  phone: string;
}
