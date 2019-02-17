import {IsNotEmpty, IsString} from 'class-validator';

export class CreateMovieDTO {
  @IsNotEmpty()
  @IsString()
  imdbId: string;
}
