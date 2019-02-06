import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MovieModule} from '@movie/movie.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'mdb',
      useNewUrlParser: true,
      synchronize: true,
      logging: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      subscribers: ['src/subscriber/*.ts'],
      migrations: ['src/migration/*.ts'],
    }),
    MovieModule,
  ],
})
export class AppModule {
}
