import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {CreateMovieDTO} from './dto/create-movie.dto';
import {UpdateMovieDTO} from './dto/update-movie.dto';
import {Movie} from './movie.entity';
import {MovieService} from './movie.service';
import {OmdbApiClient, OmdbGetResult} from 'open-movie-database-api';

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

  @Get('/add/:title')
  async addMoviesToDatabase(@Param('title') title: string): Promise<any> {
    const client: OmdbApiClient = new OmdbApiClient(process.env.OMDB_API_KEY);
    return client.get(title)
      .then((result: OmdbGetResult) => {
        return result.Title + ' ' + result.imdbRating;
      });
  }
}
