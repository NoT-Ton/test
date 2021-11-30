import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { UserService } from 'src/app/services/user.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  ColorProperty!: string;
  userid: any;
  token!: string;
  userForm = new FormGroup({
    username: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    gender: new FormControl(''),
    age: new FormControl(''),
    phone: new FormControl('',[Validators.pattern('^(08|09|06)[0-9]{8}$')]),
    email: new FormControl('',[Validators.email])
  })

  constructor(private local: LocalStorageService,private ud: UserService,private router: Router) { 
    this.onLoading();
  }

  ngOnInit(): void {
  }

  receiveData($event:any){
    this.ColorProperty = $event
  }

  get username(){
    return this.userForm.get('username') as FormArray;
  }

  get name(){
    return this.userForm.get('name') as FormArray;
  }

  get surname(){
    return this.userForm.get('surname') as FormArray;
  }

  get gender(){
    return this.userForm.get('gender') as FormArray;
  }
  
  onLoading(){
    console.log("on Function onLoading!")
    try {
      this.token = this.local.get('user').token
      this.userid = this.local.get('user').result.id
      this.ud.getUser(this.token,this.userid).subscribe(
        data => {
          this.userid = data;
        },err => {
          console.log(err)
          this.router.navigate(['/signin'])
        });
    }catch (error){
      console.log(error)
      this.router.navigate(['/signin'])
    }
  }

  editProfile(userID: any){
    console.log(userID);
    //console.log(product);
    console.log(this.userForm.value);
    this.userid = this.local.get('user').result.id
    this.ud.updateUser(this.userid,this.userForm.value).subscribe(
      data => {
        console.log(data);
        alert('User updated successfully')
        this.userForm.reset()
      },
      err =>{
        console.log(err);
      })
  }

}
