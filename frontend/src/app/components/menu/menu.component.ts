import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LocalStorageService } from 'angular-web-storage';
import { productsType } from '../../product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  cart: productsType = []

  constructor(public local: LocalStorageService,private router: Router,private cartService: CartService) { 
    this.cart = this.cartService.getCart();
  }

  ngOnInit(): void {
  }

  signout(){
    this.local.clear();
    this.router.navigate(['/signin'])
  }

  getCounter(){
    return this.cartService.getCounter();
  }

  getSumprice(){
    return this.cartService.getsumPrice();
  }

}
