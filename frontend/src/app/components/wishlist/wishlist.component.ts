import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router'
import { WishlistService } from 'src/app/services/wishlist.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
    product : WishlistService|any ;
    userid : any;
    token : any

  constructor(private router: Router,private ws:WishlistService,public local: LocalStorageService) {
      this.userid = this.local.get('user').result.id
      this.token = this.local.get('user').token
     this.ws.getWishlist(this.userid,this.token).subscribe(
       data => {
        this.product = data
        console.log(data)
       },err => {
        console.log(err)
       } )
    }


  ngOnInit(): void {
  }

  onDelete(productID: String){
    console.log(productID);

    this.ws.deleteWishlist(productID)
    window.location.reload();
  }
}
