import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CustomerDashboardComponent} from "./components/customer-dashboard/customer-dashboard.component";
import {HttpClientModule} from "@angular/common/http";

const routes:Routes =[
  {path:"dashboard",component:CustomerDashboardComponent}
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
