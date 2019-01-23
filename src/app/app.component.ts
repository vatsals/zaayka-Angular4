import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  citys: Array<any>;
  countrys: Array<any>;

  constructor(private dataService: DataService, private router: Router, private activeRoute: ActivatedRoute) {
  }

  currentUser() {
    return JSON.parse(localStorage.getItem('myUser'));
  }

}
