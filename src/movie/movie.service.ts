import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {merge} from 'lodash';
import {CreateMovieDTO} from './dto/create-movie.dto';
import {Movie} from './movie.entity';
import {MovieRepository} from './movie.repository';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieRepository) private readonly movieRepository: MovieRepository,
  ) {
  }

  async create(createMovieDto: CreateMovieDTO): Promise<Movie> {
    return this.movieRepository.save(createMovieDto);
  }

  async findOne(id: string): Promise<Movie> {
    return this.movieRepository.findOne(id);
  }

  async findAll(conditions: Partial<Movie>): Promise<Movie[]> {
    return this.movieRepository.find(conditions);
  }

  async update(id: string, newData: Partial<Movie>): Promise<Movie> {
    const movie: Movie = await this.movieRepository.findOne(id);
    return this.movieRepository.save(merge(movie, newData));
  }

  async remove(id: string): Promise<Movie> {
    const movie: Movie = await this.movieRepository.findOne(id);
    return this.movieRepository.remove(movie);
  }
}
