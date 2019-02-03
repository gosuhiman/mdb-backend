import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CreateMovieDTO} from './dto/create-movie.dto';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDTO): Promise<Movie> {
    return this.movieRepository.save(createMovieDto);
  }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }
}
