import {MovieRepository} from '@movie/movie.repository';
import {MovieService} from '@movie/movie.service';
import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {AppModule} from '@root/app.module';
import {ObjectID} from 'mongodb';
import * as request from 'supertest';
import * as td from 'testdouble';
import {movie} from '../fixtures/movie.entity.fixture';

describe('MovieController (e2e)', () => {
  let app: INestApplication;
  const mockRepository = new (td.constructor(MovieRepository))();

  function toRaw(object: any): any {
    return JSON.parse(JSON.stringify(object));
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {provide: getRepositoryToken(MovieRepository), useValue: mockRepository},
        MovieService,
      ],
    })
      .overrideProvider(getRepositoryToken(MovieRepository))
      .useValue(mockRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('[GET] /movies/:id', () => {
    td.when(mockRepository.findOne(movie.id.toString())).thenResolve(movie);

    return request(app.getHttpServer())
      .get(`/movies/${movie.id}`)
      .expect(200)
      .expect(toRaw(movie));
  });

  it('[GET] /movies', () => {
    td.when(mockRepository.find({})).thenResolve([movie]);

    return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect([toRaw(movie)]);
  });

  afterAll(async () => {
    await app.close();
  });
});
