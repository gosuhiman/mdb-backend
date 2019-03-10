import { AlreadyExistsException } from '@error/already-exists.exception';
import { OmdbService } from '@movie/omdb.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly omdbService: OmdbService,
  ) {
  }

  @Get(':id')
  async get(@Param('id') id): Promise<Movie> {
    return this.movieService.findById(id);
  }

  @Get()
  async list(): Promise<Movie[]> {
    return this.movieService.findAll({});
  }

  @Post()
  async create(@Body() createMovieDto: CreateMovieDTO): Promise<Movie> {
    const alreadyExists: boolean = await this.movieService.existsByImdbId(createMovieDto.imdbId);
    if (alreadyExists) {
      throw new AlreadyExistsException();
    }
    const movie: Movie = await this.omdbService.getByImdbId(createMovieDto.imdbId);
    return this.movieService.create(movie);
  }
}
