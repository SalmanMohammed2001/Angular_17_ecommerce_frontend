import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomerService} from "../../service/customer.service";
import {StorageService} from "../../../../service/stroge/storage.service";
import {MatDialog} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatButton,
    MatInput,
    MatFormFieldModule,
  ],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent {

  orderForm!:FormGroup
  constructor(private fb: FormBuilder,
              private route: Router,
              private snackBar: MatSnackBar,
              private customerService: CustomerService,
              private userServiceStroage: StorageService,
              private dialog: MatDialog
  ) {
  }
  ngOnInit() {
    this.orderForm = this.fb.group({
      address: ['', Validators.required],
      orderDescription: ['', Validators.required],
    })
  }

  placeOrder() {
    this.customerService.placeOrder(this.orderForm.value).subscribe((res) => {

      this.snackBar.open('order placed Successfully', 'close', {
        duration: 5000
      })
      //this.route.navigateByUrl('/customer/myOrders').then();
      this.closeForm()

    })
  }

  closeForm() {
    this.dialog.closeAll()
  }
}
