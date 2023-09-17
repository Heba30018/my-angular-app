import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  api: string = ''
  // https://api.themoviedb.org/3/movie/top_rated
  allMovies: any[] = [];
  constructor(private http: HttpClient) {}

  getAllMovies(pageNumber:number=1,language: string = 'en-US'): Observable<any> {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=d5cfb477e94bcaf9802ef5bfa419a1b6&language=${language}&page=${pageNumber}`
    );
  }
  getMovieById(movieId: number): Observable<any> {
    return this.http
      .get(`
      https://api.themoviedb.org/3/movie/${movieId}?api_key=d5cfb477e94bcaf9802ef5bfa419a1b6
    `);
  }

  searchAllMovie(movieName: string): Observable<any> {
    if (movieName == '') {
      return this.getAllMovies();
    } else {
      return this.http.get(
        `https://api.themoviedb.org/3/search/movie?api_key=d5cfb477e94bcaf9802ef5bfa419a1b6&query=${movieName}`
      );
    }
  }
}
