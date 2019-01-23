//importing mmodules
import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {

  @ViewChild('myId') myId;
  @ViewChild('oldpass') oldpass;
  @ViewChild('newpass') newpass;
  @ViewChild('confpass') confpass;


  constructor(private router: Router, private dataService: DataService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }
  //reset
  reset() {
    this.oldpass.nativeElement.value = '';
    this.newpass.nativeElement.value = '';
    this.confpass.nativeElement.value = '';

  }
  
//change password
  onSubmitForm({ value, valid }) {
    var k = {
      "old_password": this.oldpass.nativeElement.value,
      "new_password": this.newpass.nativeElement.value,
      "newpassword": this.confpass.nativeElement.value,
      "id": JSON.parse(localStorage.getItem('myUser')).userId
    }
    this.dataService.changePassword(k)
      .subscribe(
        data => {
          console.log(k);
          if (k.old_password == k.new_password) {
            alert('Passwords entered are same');
          }
          else if (k.new_password != k.newpassword) {
            alert('passwords donot match');
          }
          else {
            alert('Password changed succesfully');
          }
        }
      );
  }

}
