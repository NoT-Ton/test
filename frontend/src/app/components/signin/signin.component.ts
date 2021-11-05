import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }
  register(){
    this.router.navigate(['/signup'])
  }
  signin() {
    console.log(this.authForm.value);
    this.auth.signIn(this.authForm.value).subscribe(
      data => {
        if(data.status == true){
          this.router.navigate(['/products']);
        }else{
          alert('Username or Password is incorrect!')
        }
      },err => {
        console.log(err)
        alert('Username or Password is incorrect! in signin')
      })

  }

  signup(){
    this.auth.signUp(this.authForm.value).subscribe(
      data => {
        if(data.status == true){

          this.router.navigate(['/products']);
        }else{
          alert('Signup Successfully')
        }
      },err => {
        console.log(err)
        alert('Username or Password is incorrect! in signin')
      })

  }
}
