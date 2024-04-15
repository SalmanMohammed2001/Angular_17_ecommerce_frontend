import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminDashboardComponent} from "../admin/admin-dashboard/admin-dashboard.component";
import {CustomerDashboardComponent} from "./customer-dashboard/customer-dashboard.component";

const routes:Routes =[
  {path:"dashboard",component:CustomerDashboardComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class CustomerModule { }
