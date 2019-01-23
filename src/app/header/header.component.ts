import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;
  username: string;
  password: string;
  usrName: string;
  usrId: any;
  cardReq: number;matchedJob: number; friendReq: number; interviewReq: number; refreeReq: number;
  referenceReq: number;
  @ViewChild('alert') alt;
  @ViewChild('alertSucc') altSucc;
  @ViewChild('userEmail') userEmail;
  @ViewChild('userPassword') userPassword;
  @ViewChild('navRemove') navRemove;

  user = {
    email: '',
    password: ''
  }
  constructor(private router:Router, private dataService:DataService, private activeRoute: ActivatedRoute) {
    this.loggedIn  = false;
    if(JSON.parse(localStorage.getItem('myUser'))) {
      this.usrName = JSON.parse(localStorage.getItem('myUser')).userName;
    }
  }

  ngOnInit() {
    this.setNav();
  }

  keyDownFunction(event) {
      if(event.keyCode == 13) {

      }
    }

  setNav() {

  }

  navGo(e) {
    this.router.navigate([e.target.id]);
  }

  login(){
    this.router.navigate(['/login']);
  }

  onSubmit({value, valid}) {
  }

  home(){
    this.router.navigate(['dashboard']);
  }
  Search(){
    this.router.navigate(['search']);
  }
  AboutUs(){
   this.router.navigate(['about']);
 }

  signIn() {
    var k = {
      "username": this.userEmail.nativeElement.value,
      "password": this.userPassword.nativeElement.value
    }
    this.dataService.login(k)
      .subscribe(
            data => {
              this.usrName = this.userEmail.nativeElement.value;
              if(data.data[0]) {
                localStorage.setItem('myUser', JSON.stringify({ userId: data.data[0]._id, userName: this.usrName }));
                this.alt.nativeElement.style.display = 'none';
                this.altSucc.nativeElement.style.display = 'flex';
                this.router.navigate(['/search']);
                setTimeout(()=>{
                    this.altSucc.nativeElement.style.display = 'none';
               },8000);
              }
              else {
                this.alt.nativeElement.style.display = 'flex';
                setTimeout(()=>{
                    this.alt.nativeElement.style.display = 'none';
               },8000);
              }
            }
        );
  }

  currentUser() {
    return JSON.parse(localStorage.getItem('myUser'));
  }

  logout() {
    return localStorage.removeItem('myUser');
  }

  goto(event) {
    this.navRemove.nativeElement.classList.remove('in');
  	this.router.navigate([event]);
  }

  index(){
    this.router.navigate(['dashboard']);
  }

  changePass(e) {
    this.router.navigate(['changepass']);
  }
}
