import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  

  constructor(public local: LocalStorageService,private router: Router) { }

  ngOnInit(): void {
  }

  signout(){
    this.local.clear();
    this.router.navigate(['/signin'])
  }

}
