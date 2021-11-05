import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  products:any

  constructor(private http: HttpClient) { }

  addProduct(product: any){
    return this.http.post<any>('http://localhost:3000/comment/add', product)
    .pipe(map(data => {
      return data
    }))
  }

  getProduct2(token: any){
    const headers = {'Authorization': token}
    return this.http.get<any>('http://localhost:3000/comment/get',{headers})
    .pipe(map(data => {
      if(data){
        this.products = data
        console.log(this.products);
      }
      return this.products
    }))
  }

}
