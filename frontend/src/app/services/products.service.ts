import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map } from 'rxjs/operators'
import { Product } from '../product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products:any

  constructor(private http: HttpClient) { }

  addProduct(product: any){
    return this.http.post<any>('http://localhost:3000/api/add', product)
    .pipe(map(data => {
      return data
    }))
  }

  getAllProduct(){
    return this.http.get<any>('http://localhost:3000/api/products/get')
    .pipe(map(data => {
      if(data){
        this.products = data
        console.log(this.products);
      }
      return this.products
    }))
  }
  getProduct(token:any){
    const headers = {'Authorization': token}
    return this.http.get<any>('http://localhost:3000/api/products/get',{headers})
    .pipe(map(data => {
      if(data){
        this.products = data
        console.log(this.products);
      }
      return this.products
    }))
  }

  getProduct2(token: any){
    const headers = {'Authorization': token}
    return this.http.get<any>('http://localhost:3000/api/products/get',{headers})
    .pipe(map(data => {
      if(data){
        this.products = data
        console.log(this.products);
      }
      return this.products
    }))
  }

  updateProduct(productID: String,product: any){
    console.log(product);

    return this.http.put<any>('http://localhost:3000/api/products/update/'+productID, product)
    .pipe(map(data => {
      return data
    }))
  }
  
  getproductbytype(token: any, type: any){
    const headers = {'Authorization': token}
    return this.http.get<any>('http://localhost:3000/api/products/getproduct/'+type,{headers})
    .pipe(map(data => {
      if (data) {

        console.log(data);
      }
      return data;
    }));
  }

  deleteProduct(productID: String){
    return this.http.delete('http://localhost:3000/api/product/delete/' +productID)
    .subscribe(() => {
      console.log('deleted');

    })
  }
}
