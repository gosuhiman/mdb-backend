import { OmdbService } from '@movie/omdb.service';
import { Controller, Get, Param } from '@nestjs/common';
import { Movie } from './movie.entity';

@Controller('search')
export class SearchController {
  constructor(
    private readonly omdbService: OmdbService,
  ) {
  }

  @Get(':title')
  async search(@Param('title') title: string): Promise<Movie[]> {
    return this.omdbService.search(title);
  }
}
