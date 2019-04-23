import { Component, OnInit } from '@angular/core';

import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  news: Article[] = [];

  constructor(
    private newsService: NewsService
  ) {}


  ngOnInit(): void {
    this.loadNews();
  }

  private loadNews(): void {
    this.newsService.getTopHeadlines().subscribe(response => {
      this.news = response.articles;
    });
  }

}
