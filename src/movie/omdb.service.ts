import {Movie} from '@movie/movie.entity';
import {Injectable} from '@nestjs/common';
import * as moment from 'moment';
import {OmdbApiClient, OmdbGetResult, OmdbSearchResult, OmdbSearchResultItem} from 'open-movie-database-api';

@Injectable()
export class OmdbService {
  private omdbApiClient: OmdbApiClient;

  constructor() {
    this.omdbApiClient = new OmdbApiClient(process.env.OMDB_API_KEY);
  }

  async getByImdbId(imdbId: string): Promise<Movie> {
    const result: OmdbGetResult = await this.omdbApiClient.getByImdbId(imdbId);
    return OmdbService._movieFromOmdbGetResult(result);
  }

  async search(title: string): Promise<Movie[]> {
    const result: OmdbSearchResult = await this.omdbApiClient.search(title);
    return result.Search.map(OmdbService._movieFromOmdbSearchResultItem);
  }

  private static _movieFromOmdbSearchResultItem(item: OmdbSearchResultItem): Movie {
    return new Movie({
      imdbId: item.imdbID,
      title: item.Title,
      year: parseInt(item.Year, 10),
      type: item.Type,
      posterUrl: item.Poster,
    });
  }

  private static _movieFromOmdbGetResult(result: OmdbGetResult): Movie {
    return new Movie({
      imdbId: result.imdbID,
      title: result.Title,
      year: parseInt(result.Year, 10),
      rated: result.Rated,
      released: moment(result.Released, 'D MMM YYYY').toDate(),
      runtime: parseInt(result.Runtime, 10),
      genre: result.Genre.split(', '),
      director: result.Director.split(', '),
      writer: result.Writer.split(', '),
      actors: result.Actors.split(', '),
      plot: result.Plot,
      language: result.Language,
      country: result.Country.split(', '),
      awards: result.Awards,
      posterUrl: result.Poster,
      ratings: result.Ratings,
      metascore: parseInt(result.Metascore, 10),
      imdbRating: parseFloat(result.imdbRating),
      imdbVotes: parseInt(result.imdbVotes, 10),
      type: result.Type,
      dvd: moment(result.DVD, 'D MMM YYYY').toDate(),
      boxOffice: result.BoxOffice,
      production: result.Production,
      website: result.Website,
    });
  }
}
