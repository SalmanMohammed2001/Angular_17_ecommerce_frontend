import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CustomerDashboardComponent} from "./components/customer-dashboard/customer-dashboard.component";
import {HttpClientModule} from "@angular/common/http";
import {CartComponent} from "./components/cart/cart.component";
import {MyOrdersComponent} from "./components/my-orders/my-orders.component";
import {ViewOrderProductComponent} from "./components/view-order-product/view-order-product.component";
import {ReviewOrderProductComponent} from "./components/review-order-product/review-order-product.component";
import {ViewProductDetailsComponent} from "./components/view-product-details/view-product-details.component";

const routes:Routes =[
  {path:"dashboard",component:CustomerDashboardComponent},
  { path: 'cart', component: CartComponent },
  { path: 'myOrders', component: MyOrdersComponent },
  { path: 'order_product/:orderId', component: ViewOrderProductComponent },
  { path: 'review/:productId', component: ReviewOrderProductComponent },
  { path: 'product/:productId', component: ViewProductDetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule
  ]
})
export class CustomerModule { }
