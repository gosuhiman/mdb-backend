import {Movie} from '@movie/movie.entity';
import {ObjectID} from 'mongodb';

export const movie: Movie = new Movie({
  id: new ObjectID('5c56350f98de4b3bac4a3dcd'),
  imdbId: 'tt0110357',
  title: 'Lion King',
});
