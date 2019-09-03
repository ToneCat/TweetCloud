import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from './material.module';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { HomescreenComponent } from './homescreen.component';
import { UsernameComponent } from './username.component';
import { UsertweetComponent } from './usertweet.component';

import { AppRoutingModule } from './app-routing.module';
import { APIService } from './api.service';
import { TweetComponent } from './tweet.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagCloudModule } from 'angular-tag-cloud-module';

@NgModule({
  declarations: [
    AppComponent,
    HomescreenComponent,
    TweetComponent,
    UsernameComponent,
    UsertweetComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    MatIconModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TagCloudModule
  ],
  providers: [APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
