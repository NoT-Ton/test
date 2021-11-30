import { Injectable } from '@angular/core';
import { productsType } from '../product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  counter: number = 0;
  sumPrice: number = 0;
  cart: productsType = []

  constructor() { }

  add(p_id: number){
    console.log('Add product id: '+p_id+' to cart');
    this.counter += 1
  }

  getCounter(){
    return this.counter;
  }

  getsumPrice(){
    return this.sumPrice;
  }

  getCart(){
    return this.cart;
  }

}
