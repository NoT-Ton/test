import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FormControl, FormGroup, FormArray} from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router'

@Component({
  selector: 'app-searchproduct',
  templateUrl: './searchproduct.component.html',
  styleUrls: ['./searchproduct.component.css']
})
export class SearchproductComponent implements OnInit {

  token:any;
  type = new FormControl('')
  Edit: boolean = false;
  products: any
  productForm = new FormGroup({
    name: new FormControl(''),
    detail: new FormControl(''),
    quantity: new FormControl(''),
    price: new FormControl(''),
  })

  constructor(private ps: ProductsService, private local: LocalStorageService) { }

  ngOnInit(): void { this.onLoading();
  }

  onLoading(){
    try {
      this.token = this.local.get('user').token
      this.ps.getProduct(this.token).subscribe(
        data => {
          this.products = data;
        },err => {
          console.log(err)
        });
    }catch (error){
      console.log(error)
    }
  }

  searchbytype(){
    try { this.token = this.local.get('user').token
    this.ps.getproductbytype(this.token, this.type.value).subscribe(
      data => {
        this.products = data
        console.log(data)
      },err => {
        console.log(err)
      }
    )}
    catch(error){
      console.log(error)
    }
  }

  cleartype() {
    window.location.reload();
    this.token = this.local.get('user').token
  }



}
