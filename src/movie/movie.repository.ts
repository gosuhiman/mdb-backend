import {EntityRepository, MongoRepository} from 'typeorm';
import {Movie} from './movie.entity';

@EntityRepository(Movie)
export class MovieRepository extends MongoRepository<Movie> {}
