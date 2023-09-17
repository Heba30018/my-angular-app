import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  imagePath: string = 'https://image.tmdb.org/t/p/w500';
  selectedTV: any;
 

  //Dependency Injection
  constructor(
    private route: ActivatedRoute ,private movieService:MoviesService ) {}
  //lifecycle function
  ngOnInit(): void{
    let id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.movieService.getMovieById(id).subscribe({next:(response)=>{
      console.log(response);
      
      this.selectedTV = response;
    }});
  }
}
