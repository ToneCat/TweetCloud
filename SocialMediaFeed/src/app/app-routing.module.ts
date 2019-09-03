import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TweetComponent } from './tweet.component';
import { HomescreenComponent } from './homescreen.component';
import { UsernameComponent } from './username.component';
import { UsertweetComponent } from './usertweet.component';







const routes: Routes = [
  { path: '', component: HomescreenComponent },
  { path: 'keywords/:word', component: TweetComponent },
  { path: 'keyword', component: HomescreenComponent },
  { path: 'user/:word', component: UsertweetComponent },
  { path: 'user', component: UsernameComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}