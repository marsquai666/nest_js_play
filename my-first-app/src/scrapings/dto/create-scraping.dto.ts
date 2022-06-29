import { ApiProperty } from "@nestjs/swagger";

export class CreateScrapingDto {
  @ApiProperty({ description: "ダウンロード先のurl", required: true, default: "https://google.com" })
  url: string;

  @ApiProperty({ description: "対象を選択するセレクタ", required: false })
  selector?: string;

  @ApiProperty({ description: "出力形式（pdf/png）", required: true, default: "png" })
  format: string;
}
