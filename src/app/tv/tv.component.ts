import { Component, OnInit } from '@angular/core';
import { TvService } from '../tv.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css'],
})
export class TvComponent implements OnInit {
  imagePath: string = 'https://image.tmdb.org/t/p/w500';
  allTvs: any[] = [];
  allData: any[] = [];
  showTvDetails: boolean = true;
  lang:string = 'en-US'
  //late
  totalTvs!:number ;
  tvPerPage:number =20;
  private searchval: string = '';

  currentPage:number=1;
  
  set searchValue(value: string) {
    this.searchval = value;
    this.searchallTvs(value);
  }
  changeLanguage() {
    this.lang = this.lang == 'en-Us' ? 'ar-SA' : 'en-Us';
    this.tvservice.getllTvs(this.currentPage, this.lang).subscribe({
      next: (response) => {
        this.allTvs = response.results;
        this.allData = this.allTvs;
      },
    });
  }
  toggleDetails(tvId: number) {

    for (const item of this.allTvs) {
      if (item.id == tvId) {
        item.toggleDiscription = !item.toggleDiscription;
      }
    }
  }
  searchallTvs(tvName:string){
    this.tvservice.searchAllTv(tvName).subscribe({next:(response)=>{
      this.allTvs = response.results;
      this.allData = this.allTvs;
    }});
  }
  //Dependence Injection
  constructor(private tvservice:TvService) {}

  ngOnInit(): void {
    this.tvservice.getllTvs(this.currentPage,this.lang).subscribe({next:(response)=>{
      this.allTvs = response.results;
      this.allData = this.allTvs;
      this.totalTvs = response.total_results;
    }});
  }
  changePage(pageData : PageEvent){
    this.currentPage = pageData.pageIndex+1;
    console.log(this.currentPage)
    this.tvservice.getllTvs(this.currentPage,this.lang).subscribe({next:(response)=>{
      this.allTvs = response.results;
      this.allData = this.allTvs;
      this.totalTvs = response.total_results;
    }});
  }

}
