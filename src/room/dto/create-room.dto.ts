import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateRoomDto {
  @ApiProperty({ example: "abutech", description: "Name of room" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 10, description: "Capacity of room" })
  @IsNumber()
  @Max(30)
  @Min(12)
  size: number;
}
