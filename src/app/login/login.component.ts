import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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

  onSubmit({value, valid}) {
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
               window.location.href='dashboard';
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

}
