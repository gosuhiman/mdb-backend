import {Column, Entity, ObjectID, ObjectIdColumn} from 'typeorm';

@Entity()
export class Movie {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;
}
