import {ObjectID} from 'mongodb';
import {Movie} from '@movie/movie.entity';

export const movie: Movie = new Movie({
  id: new ObjectID('5c56350f98de4b3bac4a3dcd'),
  name: 'Lion King',
});
