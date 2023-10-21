import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class UpdateAdminDto {
  @ApiProperty({ example: "Ali", description: "Admin's name" })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  first_name: string;

  @ApiProperty({ example: "Aliyev", description: "Admin's surname" })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
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
  @IsOptional()
  phone: string;
}
