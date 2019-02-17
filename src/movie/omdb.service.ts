import {Movie} from '@movie/movie.entity';
import {Injectable} from '@nestjs/common';
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
      title: item.Title,
      year: parseInt(item.Year, 10),
      type: item.Type,
      posterUrl: item.Poster,
      imdbId: item.imdbID,
    });
  }

  private static _movieFromOmdbGetResult(result: OmdbGetResult): Movie {
    return new Movie({
      title: result.Title,
      year: parseInt(result.Year, 10),
      type: result.Type,
      posterUrl: result.Poster,
      imdbId: result.imdbID,
    });
  }
}
