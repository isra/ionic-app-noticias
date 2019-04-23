import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { IonSegment } from '@ionic/angular';

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




  @ViewChild(IonSegment) segment: IonSegment;

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
    this.getNoticias('general');
  }


  segmentChanged(event: any): void {
    this.getNoticias(event.detail.value);

  }

  private getNoticias(category: string): void {
    this.service.getCategory(category).subscribe(response => {
      this.noticias = response.articles;
      console.log(this.noticias);
    })
  }

}
