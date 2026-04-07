import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsBoolean()
  @IsOptional()
  isRead?: boolean;
}