import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CustomerDashboardComponent} from "./components/customer-dashboard/customer-dashboard.component";
import {HttpClientModule} from "@angular/common/http";
import {CartComponent} from "./components/cart/cart.component";
import {MyOrdersComponent} from "./components/my-orders/my-orders.component";

const routes:Routes =[
  {path:"dashboard",component:CustomerDashboardComponent},
  { path: 'cart', component: CartComponent },
  { path: 'myOrders', component: MyOrdersComponent },
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
