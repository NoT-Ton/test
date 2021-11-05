import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { ProductsService } from 'src/app/services/products.service';
import {CommentService} from 'src/app/services/comment.service'
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  userid: any
  token: any
  products: any
  previewLoaded: boolean = false
  productForm = new FormGroup({
    comment: new FormControl('',[Validators.required]),

  })

  constructor(private local: LocalStorageService,private ps: ProductsService,private cs: CommentService,public router: Router) {
    this.onLoading();
   }


  ngOnInit(): void {
  }

  onLoading(){

    try {
      this.token = this.local.get('user').token
      this.cs.getProduct2(this.token).subscribe(
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

  addProduct(){
    this.cs.addProduct(this.productForm.value).subscribe(
      data => {
        console.log(data);
        alert('Create comment')
        this.productForm.reset()
      },
      err =>{
        console.log(err);
      })
  }

  resetForm(){
    this.productForm.reset()
    this.previewLoaded = false
  }

}
