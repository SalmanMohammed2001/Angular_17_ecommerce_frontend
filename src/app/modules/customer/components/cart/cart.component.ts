import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../service/customer.service";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent  implements OnInit{

  constructor(private customerService:CustomerService) {
  }

  ngOnInit(): void {
    this.customerService.getCartByUserId().subscribe((res)=>{
      console.log(res.data)
    })
  }

}
