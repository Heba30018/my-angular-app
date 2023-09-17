import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvService } from '../tv.service';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.css']
})
export class TvDetailsComponent {
  imagePath: string = 'https://image.tmdb.org/t/p/w500';
 
  selectedTV:any;
 


 
  constructor(private router:ActivatedRoute,private tvservice:TvService){

  }
  ngOnInit(): void{
    let id = parseInt(this.router.snapshot.paramMap.get('id')!);
    this.tvservice.getTvByID(id).subscribe({next:(response)=>{
      console.log(response);
      
      this.selectedTV = response;
    }});
  }
}
