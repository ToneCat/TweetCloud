import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class APIService {
  constructor(private http: HttpClient) {}

  // APIURL = 'https://cosc484projectapi.herokuapp.com/';
  APIURL = 'http://localhost:8080/';
  getTweets(word) {
    return this.http.get(this.APIURL + 'search/' + word);
  }
  // use this to specific how many tweets to get
/*   getTweets(word) {
    return this.http.get(this.APIURL + 'search/' + word, {
      params: new HttpParams().set('numberOfTweets', '100')
    });
  } */

  getUser(word) {
    return this.http.get(this.APIURL + 'user/' + word);
  }
}
