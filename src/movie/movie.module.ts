import { OmdbService } from '@movie/omdb.service';
import { SearchController } from '@movie/search.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './movie.controller';
import { Movie } from './movie.entity';
import { MovieRepository } from './movie.repository';
import { MovieService } from './movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieRepository])],
  providers: [MovieService, OmdbService],
  controllers: [MovieController, SearchController],
})
export class MovieModule {
}
