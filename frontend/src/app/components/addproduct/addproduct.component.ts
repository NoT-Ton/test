import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  productType: String[] = ['Shirt','Pant', 'Shoes','Sock']
  userid: any;
  token: any;
  products: any;

  productForm = new FormGroup({
    type: new FormControl('',[Validators.required]),
    id: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    detail: new FormControl('',[Validators.required]),
    quantity: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
    file: new FormControl('',[Validators.required]),
    img: new FormControl('',[Validators.required]),
  })

  previewLoaded: boolean = false

  constructor(private ps: ProductsService,private router: Router,private local: LocalStorageService) {
      this.onLoading()
   }

  ngOnInit(): void {
  }

  addProduct(){
    this.ps.addProduct(this.productForm.value).subscribe(
      data => {
        console.log(data);
        alert('Product added successfully')
        this.productForm.reset()
      },
      err =>{
        console.log(err);
      })
  }

  onChangeImg(e:any){
    if(e.target.files.length > 0) {
      const file = e.target.files[0]
      const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.previewLoaded = true
          this.productForm.patchValue({
            img: reader.result
          })
        }
      }
    }

    onLoading(){
    
      try {
        this.token = this.local.get('user').token
        this.ps.getProduct2(this.token).subscribe(
          data => {
            this.products = data;
          },err => {
            console.log(err)
            this.router.navigate(['/signin'])
          });
      }catch (error){
        console.log(error)
        this.router.navigate(['/signin'])
      }
  }


  resetForm(){
    this.productForm.reset()
    this.previewLoaded = false
  }
}
