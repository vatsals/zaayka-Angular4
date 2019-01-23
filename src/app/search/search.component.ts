import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  userImg: string;
  myLists = [];
  citys = [];
  countrys = [];
  cuisines = [];
  @ViewChild('myId') myId;
  @ViewChild('country') country;
  @ViewChild('city') city;
  @ViewChild('name') name;
  @ViewChild('cuisine') cuisine;

  constructor(private router:Router, private dataService:DataService, private activeRoute: ActivatedRoute) {
  	this.userImg = '/assets/images/user.png';
  }

  ngOnInit() {
  	this.myLists = [];
    this.countrys = [];
    this.citys = [];
    this.cuisines = [];
  	this.fetchValues();
  }

  fetchValues() {
  	this.dataService.getCountry()
      .subscribe(
            data => {
            	for(var i=0;i<data.data.length;i++) {
            		this.countrys.push(data.data[i]._id);
            	}
            }
        );

    this.dataService.getCity()
      .subscribe(
            data => {
              	this.citys = data.data;
              	this.citys.sort();
            }
        );
    this.cuisines = ["Cafe", "North Indian", "South Indian", "Cake", "Chinese", "Bakery", "American", "Italian", "European", "Filipino", "Pizza", "Korean", "Mexican", "Desserts", "Ice Cream"];
    this.cuisines.sort();
  }

  fetchCityRests() {
  	this.name.nativeElement.value = '';
  	this.dataService.getSpecCity(this.country.nativeElement.value)
      .subscribe(
            data => {
            	this.citys = data.data;
            	this.citys.sort();
            }
        );
    if(this.country.nativeElement.value!=999 && this.city.nativeElement.value==999) {
  		this.dataService.getRestsCountry(this.country.nativeElement.value)
	      .subscribe(
	            data => {
	            	this.myLists = data.data;
	            }
	        );
  	}
  	else if(this.country.nativeElement.value!=999 && this.city.nativeElement.value!=999) {
  		this.dataService.getRestsCountity(this.country.nativeElement.value, this.city.nativeElement.value)
	      .subscribe(
	            data => {
	            	this.myLists = data.data;
	            }
	        );
  	}
  	else {}
  }

  fetchRests() {
  	this.name.nativeElement.value = '';

  	if(this.country.nativeElement.value==999 && this.city.nativeElement.value!=999) {
  		this.dataService.getRestsCity(this.city.nativeElement.value)
	      .subscribe(
	            data => {
	            	this.myLists = data.data;
	            }
	        );
  	}
  	else if(this.country.nativeElement.value!=999 && this.city.nativeElement.value!=999) {
      document.getElementById('checkTab').style.display = 'flex';
      this.dataService.getRestsCountity(this.country.nativeElement.value, this.city.nativeElement.value)
	      .subscribe(
	            data => {
	            	this.myLists = data.data;
	            }
	        );
  	}
  	else {}
  }

  fetchRestsName() {
  	if(this.name.nativeElement.value!='') {
  		if(this.country.nativeElement.value!=999 && this.city.nativeElement.value==999) {
	  		this.dataService.getRestsCountryName(this.country.nativeElement.value, this.name.nativeElement.value)
		      .subscribe(
		            data => {
		            	this.myLists = data.data;
		            }
		        );
	  	}
	  	else if(this.country.nativeElement.value==999 && this.city.nativeElement.value!=999) {
	  		this.dataService.getRestsCityName(this.city.nativeElement.value, this.name.nativeElement.value)
		      .subscribe(
		            data => {
		            	this.myLists = data.data;
		            }
		        );
	  	}
	  	else if(this.country.nativeElement.value!=999 && this.city.nativeElement.value!=999) {
	  		this.dataService.getRestsCountityName(this.country.nativeElement.value, this.city.nativeElement.value, this.name.nativeElement.value)
		      .subscribe(
		            data => {
		            	this.myLists = data.data;
		            }
		        );
	  	}
	  	else {
	  		this.dataService.getRestsName(this.name.nativeElement.value)
		      .subscribe(
		            data => {
		            	this.myLists = data.data;
		            }
		        );
	  	}
  	}
  }

  fetchDelivery() {
    this.cuisine.nativeElement.value = 999;
    var checkboxes = document.getElementsByName('cBox');
    if ((<HTMLInputElement>checkboxes[0]).checked) {
    	this.dataService.getRestsDelivery(this.country.nativeElement.value, this.city.nativeElement.value)
        		.subscribe(
  		            data => {
  		            	this.myLists = data.data;
  		            }
  		        );
    }
    else {
      this.dataService.getRestsCountity(this.country.nativeElement.value, this.city.nativeElement.value)
        .subscribe(
              data => {
                this.myLists = data.data;
              }
          );
    }
  }

  fetchCuisine() {
  	this.dataService.getRestsCuisine(this.country.nativeElement.value, this.city.nativeElement.value, this.cuisine.nativeElement.value)
      		.subscribe(
		            data => {
		            	this.myLists = data.data;
		            }
		        );
  }

  reset() {
    this.country.nativeElement.value = 999;
    this.city.nativeElement.value = 999;
    this.cuisine.nativeElement.value = 999;
    this.name.nativeElement.value = '';
    document.getElementById('checkTab').style.display = 'none';
    this.ngOnInit();
  }

  getDetails(data) {
    console.log(data);
  	this.router.navigate(['/details',data]);
  }

}
