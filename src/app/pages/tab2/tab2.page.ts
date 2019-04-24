import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { IonSegment, IonInfiniteScroll } from '@ionic/angular';

import { from } from 'rxjs';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit{


  noticias: Article[] = [];

  categoryCurrent: string;
  category: string;


  @ViewChild(IonSegment) segment: IonSegment;
  @ViewChild(IonInfiniteScroll) ifiniteScroll: IonInfiniteScroll

  categories = [
    'general',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology'
  ];

  constructor(
    private service: NewsService
  ) {

  }

  ngAfterViewInit(): void {
    this.segment.value = 'general';
    this.category = 'general';
    this.categoryCurrent = 'general';
    this.getNoticias();
  }


  segmentChanged(event: any): void {
    this.category = event.detail.value;
    this.getNoticias();

  }

  private getNoticias(eventCall?: any): void {
    this.service.getCategory(this.category).subscribe(response => {
      if (this.categoryCurrent === this.category) {
        this.noticias.push(...response.articles);
      } else {
        this.categoryCurrent = this.category;
        this.noticias = response.articles;
      }
      if (eventCall) {
        eventCall();
        if (response.articles.length === 0) {
          this.ifiniteScroll.disabled = true;
        }
      }
    })
  }

  loadData(event): void {
    this.getNoticias(function(){
      event.target.complete();
    });
  }

}
