import { Component, Input } from '@angular/core';
import { APIService } from './api.service';
import { ActivatedRoute } from '@angular/router';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { AutofillMonitor } from '@angular/cdk/text-field';



@Component({
  selector: 'tweet',
  templateUrl: './tweet.component.html',
  styles: [`h1 { font-family: Lato; color: blue; }`],
  providers: [APIService]
})


export class TweetComponent  {
  word: string;
  dataSource;
  data: CloudData[];
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value
    width : 1000,
    height : 400,

  };

  displayedColumns: string[] = ['text', 'weight'];

  constructor(private tweetService: APIService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.word = this.route.snapshot.paramMap.get('word');
    document.getElementById('container').style.visibility = 'hidden';
    this.getKeywords(this.word);
  }

  // this is where the component calls upon the API to get the keywords
  getKeywords(word) {
   this.tweetService.getTweets(word)
      .toPromise()
      .then((response: CloudData[]) => {

        this.data = response.slice(0, 50);
        this.dataSource = response;
        const elem = document.getElementById('loading');
        elem.parentNode.removeChild(elem);
        document.getElementById('container').style.visibility = 'visible';
        //console.log(this.data);

      })
      .catch((error) => {
        console.error(error);
      });
  }
}
