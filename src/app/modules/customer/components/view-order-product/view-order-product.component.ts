import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CustomerService} from "../../service/customer.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-view-order-product',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './view-order-product.component.html',
  styleUrl: './view-order-product.component.scss'
})
export class ViewOrderProductComponent {


  orderId=this.activateRoute.snapshot.params['orderId']
  orderProductDetailsList:any
  totalAmount:any
  constructor(private  activateRoute:ActivatedRoute,private customerService:CustomerService) {
  }
  ngOnInit(): void {
    this.getOrderProductDetailsByOrderId()
  }

  getOrderProductDetailsByOrderId(){
    this.customerService.getOrdersProduct(this.orderId).subscribe((res)=>{
         res.data.productDtos.forEach((element)=>{
           element.processImg='data:image/jpeg;base64,'+element.byteImage
           // @ts-ignore
           this.orderProductDetails=element
         });

      this.orderProductDetailsList=res.data.productDtos


      this.totalAmount=res.data.orderAmount;
    })
  }
}
