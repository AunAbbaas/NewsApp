import { Component,OnInit } from '@angular/core';
import { NewsService } from './service/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'NewsApp';

  public sources: any = [];
  public articles: any = [];
  public selectedNewsChannel : string = "Top 10 Trending News."
  constructor(private newsApi: NewsService) {}

  ngOnInit():void{
    this.newsApi.initArticles().subscribe((resp:any)=>{
      this.articles = resp.articles
    })

    this.newsApi.initSources().subscribe((resp:any)=>{
      this.sources = resp.sources
    })

  }

  findSource(source:any){
    this.newsApi.getArticlesByID(source.id).subscribe((resp:any)=>{
      this.articles = resp.articles;
      this.selectedNewsChannel = source.name;
    })
  }
}

