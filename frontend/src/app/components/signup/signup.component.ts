import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    gender: new FormControl(''),
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    age: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    phone: new FormControl('',[Validators.required, Validators.pattern('^(08|09|06)[0-9]{8}$')])
  })

  get email() {
    return this.authForm.get('email') as FormGroup
  }

  get phone() {
    return this.authForm.get('phone') as FormGroup
  }

  get name() {
    return this.authForm.get('name') as FormGroup
  }

  get surname() {
    return this.authForm.get('surname') as FormGroup
  }

  get gender() {
    return this.authForm.get('gender') as FormGroup
  }

  get username() {
    return this.authForm.get('username') as FormGroup
  }

  get password() {
    return this.authForm.get('password') as FormGroup
  }

  get age() {
    return this.authForm.get('age') as FormGroup
  }

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  back2signin(){
    this.router.navigate(['/signin'])
  }

  signup(){
    this.auth.signUp(this.authForm.value).subscribe(
      data => {
        console.log(this.authForm.value);
        if(data.status == true){
          this.router.navigate(['/signup']);
        }else{
          alert('signup successful!')

          //navigate to products but go to signin
          this.router.navigate(['/products']);
        }
      },err => {
        console.log(err)
        alert('signup is incorrect! in signup')
      })

  }
}
