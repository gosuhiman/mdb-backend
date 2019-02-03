import {Column, Entity, ObjectID, ObjectIdColumn} from 'typeorm';

@Entity()
export class Movie {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  director: string;

  @Column()
  writers: string[];

  @Column()
  cast: string[];

  @Column()
  genres: string[];

  @Column()
  storyline: string;

  @Column()
  imdbRating: number;
}