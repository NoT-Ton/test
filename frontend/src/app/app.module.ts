import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddproductComponent } from './components/addproduct/addproduct.component';
import { ProductsComponent } from './components/products/products.component';
import { ShowproductsComponent } from './components/showproducts/showproducts.component';
import { SigninComponent } from './components/signin/signin.component';
import { AngularWebStorageModule } from 'angular-web-storage';
import { SignupComponent } from './components/signup/signup.component';
import { EditproductComponent } from './components/editproduct/editproduct.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangecolorComponent } from './components/changecolor/changecolor.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { SearchproductComponent } from './components/searchproduct/searchproduct.component';

@NgModule({
  declarations: [
    AppComponent,
    AddproductComponent,
    ProductsComponent,
    ShowproductsComponent,
    SigninComponent,
    SignupComponent,
    EditproductComponent,
    MenuComponent,
    ProfileComponent,
    ChangecolorComponent,
    WishlistComponent,
    SearchproductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularWebStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
