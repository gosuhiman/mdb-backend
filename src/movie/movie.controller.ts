import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
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

  @Post()
  async create(@Body() createMovieDto: CreateMovieDTO): Promise<Movie> {
    return this.movieService.create(createMovieDto);
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<Movie> {
    return this.movieService.findOne({id});
  }

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.movieService.findAll({});
  }

  @Patch(':id')
  update(@Param('id') id, @Body() updateMovieDto: UpdateMovieDTO) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.movieService.remove({id});
  }
}
