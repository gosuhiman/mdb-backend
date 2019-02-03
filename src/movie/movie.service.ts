import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { merge } from 'lodash';
import { MongoRepository } from 'typeorm';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: MongoRepository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDTO): Promise<Movie> {
    return this.movieRepository.save(createMovieDto);
  }

  async findOne(conditions: Partial<Movie>): Promise<Movie> {
    return this.movieRepository.findOne(conditions);
  }

  async findAll(conditions: Partial<Movie>): Promise<Movie[]> {
    return this.movieRepository.find(conditions);
  }

  async update(id: string, newData: Partial<Movie>): Promise<Movie> {
    const movie: Movie = await this.movieRepository.findOne(id);
    return this.movieRepository.save(merge(movie, newData));
  }

  async remove(conditions: Partial<Movie>): Promise<Movie[]> {
    const movies: Movie[] = await this.movieRepository.find(conditions);
    return this.movieRepository.remove(movies);
  }
}
