import { Component} from '@angular/core';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent{

  constructor(public globals: GlobalsService){}
  
  //Chnaging global variables
  setFromHistory(){
    this.globals.fromHistory=false;
    this.globals.search="farmanAbbasi";
  }
}
