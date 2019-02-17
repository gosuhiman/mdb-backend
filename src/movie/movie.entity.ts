import {Column, Entity, ObjectID, ObjectIdColumn} from 'typeorm';

@Entity()
export class Movie {
  @ObjectIdColumn() id: ObjectID;
  @Column() imdbId: string;
  @Column() title: string;
  @Column() year: number;
  @Column() rated: string;
  @Column() released: Date;
  @Column() runtime: number;
  @Column() genre: string[];
  @Column() director: string[];
  @Column() writer: string[];
  @Column() actors: string[];
  @Column() plot: string;
  @Column() language: string;
  @Column() country: string[];
  @Column() awards: string;
  @Column() posterUrl: string;
  @Column() ratings: Array<{ Source: string; Value: string; }>;
  @Column() metascore: number;
  @Column() imdbRating: number;
  @Column() imdbVotes: number;
  @Column() imdbID: string;
  @Column() type: string;
  @Column() dvd: Date;
  @Column() boxOffice: string;
  @Column() production: string;
  @Column() website: string;

  constructor(partial?: Partial<Movie>) {
    if (partial !== undefined) {
      Object.assign(this, partial);
    }
  }
}
