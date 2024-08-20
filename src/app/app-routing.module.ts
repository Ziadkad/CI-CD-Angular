import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AddProductComponent} from "./components/add-product/add-product.component";

const routes: Routes = [
  { path:'', component: HomeComponent},
  { path:'add',component :AddProductComponent },
  { path:'update/:id',component :AddProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
