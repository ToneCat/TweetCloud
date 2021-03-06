import { Component, Input } from '@angular/core';
import { APIService } from './api.service';
import { ActivatedRoute } from "@angular/router";
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';



@Component({
  selector: 'usertweet',
  templateUrl: './usertweet.component.html',
  styles: [`h1 { font-family: Lato; color: blue; }`],
  providers: [APIService]

})

export class UsertweetComponent  {
  word: string;
  dataSource;
  data: CloudData[];
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value
    width : 600,
    height : 200,
  };

  displayedColumns: string[] = ['text', 'weight'];

  constructor(private tweetService: APIService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.word = this.route.snapshot.paramMap.get('word');
    document.getElementById('container').style.visibility = 'hidden';
    this.getUser(this.word);
  }

  // this is where the component calls upon the API to get the username
  getUser(word){
    
   this.tweetService.getUser(word)
      .toPromise()
      .then((response: CloudData[]) => {
        //this.data = response.slice(0, 20);
        this.dataSource = response;
        const elem = document.getElementById('loadingcontainer');
        elem.parentNode.removeChild(elem);
        document.getElementById('container').style.visibility = 'visible';
        
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
