import {IsArray, IsNotEmpty, IsOptional, IsPositive, IsString} from 'class-validator';

export class CreateMovieDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  director: string;

  @IsOptional()
  @IsArray()
  writers: string[];

  @IsOptional()
  @IsArray()
  cast: string[];

  @IsOptional()
  @IsArray()
  genres: string[];

  @IsOptional()
  @IsString()
  storyline: string;

  @IsOptional()
  @IsPositive()
  imdbRating: number;
}
