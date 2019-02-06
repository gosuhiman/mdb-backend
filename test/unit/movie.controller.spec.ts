import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {ObjectID} from 'mongodb';
import * as td from 'testdouble';
import {movie} from '../fixtures/movie.entity.fixture';
import {MovieController} from '../../src/movie/movie.controller';
import {MovieRepository} from '../../src/movie/movie.repository';
import {MovieService} from '../../src/movie/movie.service';

describe('MovieController', () => {
  let movieController: MovieController;
  let movieService: MovieService;

  const mockRepository = new (td.constructor(MovieRepository))();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {provide: getRepositoryToken(MovieRepository), useValue: mockRepository},
        MovieService,
      ],
    }).compile();

    movieController = app.get<MovieController>(MovieController);
    movieService = app.get<MovieService>(MovieService);
  });

  describe('get', () => {
    it('should return movie', async () => {
      td.when(mockRepository.findOne(movie.id)).thenResolve(movie);
      expect(await movieController.get(movie.id)).toEqual(movie);
    });
  });

  describe('list', () => {
    it('should return list of movies', async () => {
      td.when(mockRepository.find({})).thenResolve([movie]);
      expect(await movieController.list()).toEqual([movie]);
    });
  });
});
