import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvService {
  api:string = 'd5cfb477e94bcaf9802ef5bfa419a1b6';
  
  // https://api.themoviedb.org/3/movie/top_rated
  allTvs: any[] = [];
  constructor(private http:HttpClient) { }

  getllTvs(pageNumber:number=1,lang:string='en-US'):Observable<any>{
    return this.http.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.api}&language=${lang}&page=${pageNumber}`);
  }
  getTvByID(tvId:number):Observable<any>{
    return this.http.get(`
    https://api.themoviedb.org/3/tv/${tvId}?api_key=${this.api}`);
  }
 
  searchAllTv(tvName: string): Observable<any> {
    if (tvName == '') {
      return this.getllTvs();
    } else {
      return this.http.get(
         `
         https://api.themoviedb.org/3/search/tv?api_key=${this.api}&query=${tvName}`
      );
    }
  }
}
