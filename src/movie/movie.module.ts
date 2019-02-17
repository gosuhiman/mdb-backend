import {OmdbService} from '@movie/omdb.service';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MovieController} from './movie.controller';
import {Movie} from './movie.entity';
import {MovieRepository} from './movie.repository';
import {MovieService} from './movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieRepository])],
  providers: [MovieService, OmdbService],
  controllers: [MovieController],
})
export class MovieModule {
}
