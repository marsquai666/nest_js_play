import { ApiProperty } from "@nestjs/swagger";

export class CreateScrapingDto {
  @ApiProperty()
  url: string;
}
