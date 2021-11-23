import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  success_history = [];
  fail_history = [];
  constructor(public router: Router, public globals: GlobalsService) { }

  ngOnInit() {
    this.success_history = JSON.parse(localStorage.getItem("success_history"));
    this.fail_history = JSON.parse(localStorage.getItem("fail_history"));
    console.log(this.success_history)
  }
  //To delete particular index from the success_history array and saving it back to the localStorage
  deleteFromSuccessHistory(i) {
    console.log(i)
    this.success_history.splice(i, 1)
    localStorage.setItem("success_history", JSON.stringify(this.success_history))
  }

  //To delete particular index from the fail_history array and saving it back to the localStorage
  deleteFromFailHistory(i) {
    this.fail_history.splice(i, 1)
    localStorage.setItem("fail_history", JSON.stringify(this.fail_history))
  }

 //Navigating back to the search route with search query from history
  openSearch(i) {
    this.globals.search = this.success_history[i];
    this.globals.fromHistory = true;
    this.router.navigate(["search"]);
  }

}
