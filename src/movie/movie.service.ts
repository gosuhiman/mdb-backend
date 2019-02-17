import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Movie} from './movie.entity';
import {MovieRepository} from './movie.repository';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieRepository) private readonly movieRepository: MovieRepository,
  ) {
  }

  async create(movie: Movie): Promise<Movie> {
    return this.movieRepository.save(movie);
  }

  async findById(id: string): Promise<Movie> {
    return this.movieRepository.findOne(id);
  }

  async existsByImdbId(imdbId: string): Promise<boolean> {
    const count: number = await this.movieRepository.count({imdbId});
    return count > 0;
  }

  async findAll(conditions: Partial<Movie>): Promise<Movie[]> {
    return this.movieRepository.find(conditions);
  }
}
