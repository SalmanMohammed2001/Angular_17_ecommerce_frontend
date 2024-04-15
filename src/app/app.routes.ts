import { Routes } from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";


export const routes: Routes = [
  {path:"",redirectTo:"/header",pathMatch:"full"},
  {path:"header",component:HeaderComponent},
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
  { path: 'customer', loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule)},

];
