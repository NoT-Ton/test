import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { ShowproductsComponent } from './components/showproducts/showproducts.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import {ProductsComponent} from './components/products/products.component'
import {EditproductComponent} from './components/editproduct/editproduct.component'
import {MenuComponent} from './components/menu/menu.component'
import { ProfileComponent } from './components/profile/profile.component';
import {WishlistComponent} from './components/wishlist/wishlist.component'
import {SearchproductComponent} from './components/searchproduct/searchproduct.component'
const routes: Routes = [
  {path: 'addproduct', component: AddproductComponent},
  {path: 'showproducts', component: ShowproductsComponent},
  {path: 'editproduct', component: EditproductComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'searchproduct', component: SearchproductComponent},
  {path: '', redirectTo: 'signin', pathMatch: 'full'},
  {path: 'wishlist', component: WishlistComponent},
  {path: '', redirectTo: 'products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
