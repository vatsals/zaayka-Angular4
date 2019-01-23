//importing modules
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class DataService {

  private review = "/api/review";
  private fetchReview = "/api/fetchReview/";
  private changePass="/api/change/password";
  private log = "/api/login";
  private fetchCountry = "/api/country";
  private fetchCity = "/api/city";
  private fetchSpecCity = "/api/city/";
  private fetchRestsCountry = "/api/country/Zomato/";
  private fetchRestsCity = "/api/city/Zomato/";
  private fetchRestsCountity = "/api/countity/Zomato/";
  private fetchRestsName = "/api/name/Zomato/";
  private fetchRestsCountryName = "/api/countryname/Zomato/";
  private fetchRestsCityName = "/api/cityname/Zomato/";
  private fetchRestsCountityName = "/api/countityname/Zomato/";
  private fetchRestsDelivery = "/api/delivery/Zomato/";
  private fetchRestsCuisine = "/api/cuisine/Zomato/";
  private fetchRestsaddr ='/api/Address/';

  constructor(private http: Http) {
  }

  //login service
  login(k:any) {
  	var headersForTokenApi = new Headers({'Content-Type': 'application/json'});
  	let body =JSON.stringify(k);
  	var url = this.log;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  //reviews service
  reviews(k:any) {
    var headersForTokenApi = new Headers({'Content-Type': 'application/json'});
    let body =JSON.stringify(k);
    var url = this.review;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  //fetching reviews
  fetchReviews(restaurant: any) {
    var url = this.fetchReview + restaurant;
    return this.http.get(url)
    .map(response => response.text() ? response.json() : response)
  }

  //change password service
  changePassword(k:any): Observable<any> {
    var headersForTokenApi = new Headers({'Content-Type': 'application/json'});
    let body =JSON.stringify(k);
    var url = this.changePass;
    return this.http.post(url, body, {headers: headersForTokenApi}).map(response => response.text() ? response.json() : response);
  }

  //current location service
  getCurrentIpLocation() {
        return this.http.get('http://ipinfo.io')
        .map(response => response.json())
        .catch(error => {
            console.log(error);
            return Observable.throw(error.json());
        });
    }

    //get country service
  getCountry() {
    var url = this.fetchCountry;
    return this.http.get(url)
    .map(response => response.text() ? response.json() : response)
  }

  //get city service
  getCity() {
  	var url = this.fetchCity;
    return this.http.get(url)
    .map(response => response.text() ? response.json() : response)
  }

  //get specific city service
  getSpecCity(country: any) {
    var url = this.fetchSpecCity + country;
    return this.http.get(url)
    .map(response => response.text() ? response.json() : response)
  }

  //get country service
  getRestsCountry(country: any) {
    var url = this.fetchRestsCountry + country;
    return this.http.get(url)
    .map(response => response.text() ? response.json() : response)
  }

  //get city service
  getRestsCity(city: any) {
    var url = this.fetchRestsCity + city;
    return this.http.get(url)
    .map(response => response.text() ? response.json() : response)
  }

  //get country and city service
  getRestsCountity(city: any, country: any) {
    var url = this.fetchRestsCountity + city + '/' + country;
    return this.http.get(url)
    .map(response => response.text() ? response.json() : response)
  }

  //get restaurants by name service
  getRestsName(name: any) {
    var url = this.fetchRestsName + name;
    return this.http.get(url)
    .map(response => response.text() ? response.json() : response)
  }

  //get restaurants in a country and by name service
  getRestsCountryName(country: any, name: any) {
    var url = this.fetchRestsCountryName + country  + '/' + name;
    return this.http.get(url)
    .map(response => response.text() ? response.json() : response)
  }

  //by city and name of restaurant service
  getRestsCityName(city: any, name: any) {
    var url = this.fetchRestsCityName + city + '/' + name;
    return this.http.get(url)
    .map(response => response.text() ? response.json() : response)
  }

  //by country city and name of restaurants service
  getRestsCountityName(city: any, country: any, name: any) {
    var url = this.fetchRestsCountityName + city + '/' + country + '/' + name;
    return this.http.get(url)
    .map(response => response.text() ? response.json() : response)
  }

  //by delivery service
  getRestsDelivery(city: any, country: any) {
    var url = this.fetchRestsDelivery + city + '/' + country;
    return this.http.get(url)
    .map(response => response.text() ? response.json() : response)
  }

  //by cuisine
  getRestsCuisine(city: any, country: any, name: any) {
    var url = this.fetchRestsCuisine + city + '/' + country + '/' + name;
    return this.http.get(url)
    .map(response => response.text() ? response.json() : response)
  }

  //TODO send in details component
  getRestsaddr(addr: any) {
    var url = this.fetchRestsaddr + addr; //private fetchRestsaddr ='/api/Address/';
    return this.http.get(url)
    .map(response => response.text() ? response.json() : response)
  }

}
