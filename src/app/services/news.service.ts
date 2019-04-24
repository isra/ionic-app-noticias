import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TopHeadlines } from '../interfaces/interfaces';

import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const url = environment.url;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  page = 0;

  pageCategoria = 0;
  category: string = '';

  constructor(
    private http: HttpClient
  ) {

  }

  private getQuery(query: string): Observable<TopHeadlines> {
    query = `${url}/${query}`;
    return this.http.get<TopHeadlines>(query, { headers });
  }


  getTopHeadlines(): Observable<TopHeadlines> {
    //const url = `https://newsapi.org/v2/top-headlines?country=mx&apiKey=af25402b616b4427b680f2dc44510d08`;
    //return this.http.get<TopHeadlines>(url);
    this.page++;
    return this.getQuery(`/top-headlines?country=mx&page=${this.page}`);
  }

  getCategory(category: string): Observable<TopHeadlines> {
    if (this.category === category) {
      this.pageCategoria++;
    } else {
      this.pageCategoria = 1;
    }
    this.category = category;

    const query = `/top-headlines?country=mx&category=${category}&page=${this.pageCategoria}`;
    return this.getQuery(query);
  }
}
