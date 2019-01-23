import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { DataService } from '../data.service';
declare var google: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
    userImg: string;
    myLists: any;
    lat: any;
    long: any;
    name: any;
    reviews: any;
    @ViewChild('myId') myId;
    @ViewChild('username') username;
    @ViewChild('review') review;
    @ViewChild('rating') rating;
    @ViewChild('alert2') alt2;
    @ViewChild('alertSucc2') altSucc2;

  constructor(private dataService:DataService,private activeRoute: ActivatedRoute) {
    this.userImg = '/assets/images/user.png';
    setTimeout(()=>{
        this.myMap(this.lat, this.long, this.name);
    }, 3500);
  }

  ngOnInit() {
    this.myLists = {};
    this.setDetails();
    this.fetchDetails();
  }

  myMap(lat, long, name) {
    console.log(lat + " : " + long + ", " + name);
    var myCenter = new google.maps.LatLng(lat, long);
    var mapCanvas = document.getElementById("map");
    var mapOptions = {center: myCenter, zoom: 15};
    var map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({position:myCenter});
    marker.setMap(map);

    var infowindow = new google.maps.InfoWindow({
      content: name
    });
    infowindow.open(map,marker);
  }

  fetchDetails() {
    this.myLists = {};
    this.reviews = [];
    let object=this;
    let address = this.activeRoute.snapshot.paramMap.get('address');
  	this.dataService.getRestsaddr(address)
      		.subscribe(
		            data => {
		            	this.myLists = data.data[0];
                  this.lat = this.myLists.Latitude;
                  this.long = this.myLists.Longitude;
                  this.name = this.myLists.Restaurant_Name;
                  console.log(this.lat + " : " + this.long + ", " + this.name);
		            }
		        );
    setTimeout(()=>{
      this.fetchReviews();
    }, 2000);
  }

  fetchReviews() {
    this.dataService.fetchReviews(this.name)
          .subscribe(
                data => {
                  this.reviews = data.data;
                  console.log(this.reviews);
                }
            );
  }


  setDetails(){
    //console.log(address);
  }

  addReview() {
    var k = {
      "restaurant": this.name,
      "name": this.username.nativeElement.value,
      "rating": parseFloat(this.rating.nativeElement.value),
      "review": this.review.nativeElement.value
    }
    this.dataService.reviews(k)
      .subscribe(
            data => {
              if(data.insertedCount) {
                this.alt2.nativeElement.style.display = 'none';
                this.altSucc2.nativeElement.style.display = 'flex';
                this.fetchDetails();
                setTimeout(()=>{
                    this.altSucc2.nativeElement.style.display = 'none';
                },8000);
              }
              else {
                this.alt2.nativeElement.style.display = 'flex';
                this.fetchDetails();
                setTimeout(()=>{
                    this.alt2.nativeElement.style.display = 'none';
               },8000);
              }
            }
        );
  }

}
