import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../service/customer.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {StorageService} from "../../../../service/stroge/storage.service";
import {MatDialog} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {CurrencyPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatIcon,
    NgClass,
    MatIconButton,
    CurrencyPipe,
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    RouterModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatInput,
    NgForOf,
    NgIf

  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent  implements OnInit{

  cartItems:any[]=[]
  order:any

  couponForm!:FormGroup

  constructor(private fb: FormBuilder,
              private route: Router,
              private snackBar: MatSnackBar,
              private customerService: CustomerService,
              private  userServiceStroage:StorageService,
              private dialog:MatDialog
  ) {
  }
  ngOnInit(){
    this.couponForm=this.fb.group({
      code:['',[Validators.required]]
    })
    this.getCart()
  }


  getCart(){
    this.cartItems=[]
    this.customerService.getCartByUserId().subscribe((res)=>{
      this.order=res.data
      res.data.cardItem.forEach((element: { processImg: string; returnImg: string; })=>{
        element.processImg='data:image/jpeg;base64,'+element.returnImg
        this.cartItems.push(element)
        console.log(this.cartItems)
      })
    })
  }
  decreaseProductQuantity(id:any){

  }

  increaseProductQuantity(id:any){

  }

}
