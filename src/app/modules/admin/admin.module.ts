import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {HttpClientModule} from "@angular/common/http";
import {PostcategoryComponent} from "./components/postcategory/postcategory.component";




const routes:Routes =[
  {path:"dashboard",component:AdminDashboardComponent},
  {path:"postCategory",component:PostcategoryComponent},



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
