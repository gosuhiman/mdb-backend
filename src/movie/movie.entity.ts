import {Column, Entity, ObjectID, ObjectIdColumn} from 'typeorm';

@Entity()
export class Movie {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  imdbId: string;

  @Column()
  title: string;

  @Column()
  year: number;

  @Column()
  type: string;

  @Column()
  posterUrl: string;

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

  constructor(partial?: Partial<Movie>) {
    if (partial !== undefined) {
      Object.assign(this, partial);
    }
  }
}
