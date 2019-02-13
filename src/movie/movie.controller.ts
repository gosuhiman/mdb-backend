import {Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post} from '@nestjs/common';
import {CreateMovieDTO} from './dto/create-movie.dto';
import {UpdateMovieDTO} from './dto/update-movie.dto';
import {Movie} from './movie.entity';
import {MovieService} from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
  ) {
  }

  @Get(':id')
  async get(@Param('id') id): Promise<Movie> {
    return this.movieService.findOne(id);
  }

  @Get()
  async list(): Promise<Movie[]> {
    return this.movieService.findAll({});
  }

  @Post()
  async create(@Body() createMovieDto: CreateMovieDTO): Promise<Movie> {
    return this.movieService.create(createMovieDto);
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() updateMovieDto: UpdateMovieDTO): Promise<Movie> {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  async remove(@Param('id') id): Promise<Movie> {
    return this.movieService.remove(id);
  }
}
