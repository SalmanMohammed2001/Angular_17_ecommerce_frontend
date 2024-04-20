import { Component } from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {CustomerService} from "../../service/customer.service";

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    DatePipe,
    NgIf
  ],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent {

  myOrders:any

  constructor(private customerService:CustomerService) {
  }

  ngOnInit(){
    this.getMyOrders()
  }

  getMyOrders(){
    this.customerService.getOrderByUserId().subscribe((res)=>{
      this.myOrders=res.data
    })
  }
}
