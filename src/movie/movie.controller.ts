import {Body, Controller, Get, Post} from '@nestjs/common';
import {CreateMovieDto} from './dto/create-movie.dto';
import {Movie} from './movie.entity';
import {MovieService} from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
  ) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }
}
