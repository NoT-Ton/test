import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  counter: Number =0;
  product : WishlistService|any = [];
  ws : WishlistService|any = [];
  cart: ProductsService |any = []

  constructor(private http:HttpClient) { }

  getWishlist(id:any,token:any){
    const headers = {'Authorization':token}
   return this.http.get<any>('http://localhost:3000/wishlist/get/'+id,{headers})
   .pipe(map(data => {
     if (data) {
      this.product = data
       //this.product.push(data)
       console.log(data)
     }
     return data;
   }));
 }
 add2Wishlist(token:any, id:any,product:any){
  const headers = {'Authorization':token}
  console.log('hello from add his')
  console.log(this.ws.id)
  console.log(product)
  console.log('game here')
  return this.http.post<any>('http://localhost:3000/wishlist/add/'+id,product)
  .pipe(map(data => {
    if (data) {
      //this.product.push(data)
      console.log(data)
    }
    return data;
  }));
 }

 deleteWishlist(productID: String){
  return this.http.delete('http://localhost:3000/wishlist/delete/' +productID)
  .subscribe(() => {
    console.log('deleted Wishlist');

  })
}

addG(games: any,token:any,userid:any){
  const headers = {'Authorization': token}
  return this.http.post<any>('http://localhost:3000/wishlist/add/'+userid,games,{headers})
  .pipe(map(data => {
    if (data) {
      alert('Added to wishlist')
      this.cart.push(data)

      console.log(data);
    }
    return this.cart;
  }));
}
}
