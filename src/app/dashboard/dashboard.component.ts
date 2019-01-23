import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userImg: string;
  baseLat: any;
  baseLong: any;
  baseCity: any;
  lats: any;
  longs: any;
  locations = [];
  myLists = [];
  @ViewChild('myId') myId;
  @ViewChild('city') city;
  @ViewChild('fetch') fetch;

  constructor(private router:Router, private dataService:DataService, private activeRoute: ActivatedRoute) {
  	this.userImg = '/assets/images/user.png';
  	this.dataService.getCurrentIpLocation()
	      .subscribe(
	            data => {
	            	this.city.nativeElement.value = data.city;
	            }
	        );
    setTimeout(()=>{
    	this.fetch.nativeElement.click();
    }, 2000);
  }

  myMap(lat, long, name, locations) {
    var myCenter = new google.maps.LatLng(lat, long);
    var mapCanvas = document.getElementById("map2");
    var mapOptions = {center: myCenter, zoom: 10};
    var map = new google.maps.Map(mapCanvas, mapOptions);
    var infowindow = new google.maps.InfoWindow();
    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  }

  ngOnInit() {
  	this.fetchValues();
  }

  fetchValues() {

  	this.myLists = [];
  	if(this.city.nativeElement.value!='') {
  		this.dataService.getRestsCity('Mumbai')
	      .subscribe(
	            data => {
	            	this.myLists = data.data.splice(0,6);
                this.baseCity = this.myLists[0].Restaurant_Name;
                this.baseLat = this.myLists[0].Latitude;
                this.baseLong = this.myLists[0].Longitude;
                for(var i=0;i<this.myLists.length;i++) {
                  var arr = [];
                  arr[0] = this.myLists[i].Restaurant_Name;
                  arr[1] = this.myLists[i].Latitude;
                  arr[2] = this.myLists[i].Longitude;
                  arr[3] = i+1;
                  console.log(arr);
                  this.locations.push(arr);
                }
                this.myMap(this.baseLat, this.baseLong, this.baseCity, this.locations);
	            }
	        );
  	}
  }

  search() {
  	this.router.navigate(['/search']);
  }

  getDetails(data) {
    console.log(data);
    this.router.navigate(['/details',data]);
  }

}
