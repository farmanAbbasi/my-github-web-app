import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchUsersComponent } from './search-users/search-users.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path:"search",
    component: SearchUsersComponent
  },
  {
    path:"history",
    component:HistoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
