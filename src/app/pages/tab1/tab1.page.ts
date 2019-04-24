import { Component, OnInit, ViewChild } from '@angular/core';

import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonInfiniteScroll) ifiniteScroll: IonInfiniteScroll;


  news: Article[] = [];

  constructor(
    private newsService: NewsService
  ) {}


  ngOnInit(): void {
    this.loadNews();
  }

  private loadNews(eventCall?: any): void {
    this.newsService.getTopHeadlines().subscribe(response => {
      this.news.push(...response.articles);
      if (eventCall) {
        eventCall();
      }
      if (response.articles.length === 0) {
        this.ifiniteScroll.disabled = true;
      }
    });
  }

  loadData(event): void {
    this.loadNews(function(){
      event.target.complete();
    });
  }

}
