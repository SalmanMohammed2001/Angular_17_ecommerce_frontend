import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {HttpClientModule} from "@angular/common/http";
import {PostcategoryComponent} from "./components/postcategory/postcategory.component";
import {PostProductComponent} from "./components/post-product/post-product.component";
import {PostCouponComponent} from "./components/post-coupon/post-coupon.component";
import {CouponsComponent} from "./components/coupons/coupons.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {PostProductFaqComponent} from "./components/post-product-faq/post-product-faq.component";
import {UpdateproductComponent} from "./components/updateproduct/updateproduct.component";




const routes:Routes =[
  {path:"dashboard",component:AdminDashboardComponent},
  {path:"postCategory",component:PostcategoryComponent},
  {path:"postProduct",component:PostProductComponent},
  {path:"postCoupon",component:PostCouponComponent},
  {path:"coupons",component:CouponsComponent},
  {path:"orders",component:OrdersComponent},
  {path:"faq/:productId",component:PostProductFaqComponent},
  {path:"product/:productId",component:UpdateproductComponent},

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule

  ]
})
export class AdminModule { }
