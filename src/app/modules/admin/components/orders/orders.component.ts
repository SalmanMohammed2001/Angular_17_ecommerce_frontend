import { Component } from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatSnackBarModule,
    DatePipe,
    NgForOf
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  orders:any

  constructor(private  adminService:AdminService,private snackbar:MatSnackBar) {
  }

  ngOnInit(){
    this.getPlaceOrders()
  }

  getPlaceOrders(){
    this.adminService.getAllPlaceOrder().subscribe((res)=>{
      this.orders=res.data;
      console.log(this.orders)
    })
  }

  changeOrderStatus(orderId:any,status:any){
    this.adminService.changeOrderStatus(orderId,status).subscribe((res)=>{
      this.snackbar.open('Order status change successfully','close',{
        duration:5000
      })
      this.getPlaceOrders();
    })
  }
}
