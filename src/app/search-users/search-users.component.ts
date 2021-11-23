import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../globals.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormArrayName } from '@angular/forms';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent implements OnInit {
  searched_user: any;
  repos_array = [];

  constructor(public globals: GlobalsService) { }

  ngOnInit() {
    this.searchUser(this.globals.search);
  }

  //Get user details using github api
  async searchUser(searchTerm) {
    searchTerm = searchTerm.toLowerCase()
    try {
      const r: any = await this.globals.getReq(this.globals.BASE_GITHUB_API_URL + "/users" + "/" + searchTerm);
      this.searched_user = r;
      this.getRepos(searchTerm)
      this.maintainHistoryForSuccess(searchTerm)
    }
    catch (e) {
      console.log(e);
      this.repos_array = [];
      this.searched_user = {
        "avatar_url": "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png",
        "name": "Not found",
        "bio": "Not found"
      };
      this.maintainHistoryForFailure(searchTerm)
    }

  }

  //Pushing searchTerm in success_history array
  maintainHistoryForSuccess(searchTerm) {
    var historyArray = [];
    historyArray = JSON.parse(localStorage.getItem("success_history"))
    if (historyArray == null) {
      historyArray = [searchTerm]
    }
    //element does not exists
    if (historyArray.indexOf(searchTerm) == -1) {
      historyArray.push(searchTerm)
    }
    //exists , so delete and add
    else {
      historyArray.splice(historyArray.indexOf(searchTerm), 1)
      historyArray.push(searchTerm)
    }
    localStorage.setItem("success_history", JSON.stringify(historyArray.reverse()))

  }

  //Pushing searchTerm in fail_history array
  maintainHistoryForFailure(searchTerm) {
    var failedHistoryArray = [];
    failedHistoryArray = JSON.parse(localStorage.getItem("fail_history"))
    if (failedHistoryArray == null) {
      failedHistoryArray = [searchTerm]
    }
    //element does not exists
    if (failedHistoryArray.indexOf(searchTerm) == -1) {
      failedHistoryArray.push(searchTerm)
    }
    //exists , so delete and add
    else {
      failedHistoryArray.splice(failedHistoryArray.indexOf(searchTerm), 1)
      failedHistoryArray.push(searchTerm)
    }
    localStorage.setItem("fail_history", JSON.stringify(failedHistoryArray.reverse()))

  }

  //Get repos for a user
  async getRepos(username) {
    try {
      const r: any = await this.globals.getReq(this.globals.BASE_GITHUB_API_URL + "/users" + "/" + username + "/repos");
      this.repos_array = r;
      this.repos_array = r.map(item => item.full_name.split("/")[1])
      //console.log(r)
    }
    catch (e) {
      console.log(e)
    }
  }

}
