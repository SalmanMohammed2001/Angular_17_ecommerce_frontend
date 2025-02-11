import {Component, OnInit} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput, MatInputModule} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AdminService} from "../../../admin/service/admin.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDivider} from "@angular/material/divider";
import {MatCard} from "@angular/material/card";
import {RouterLink, RouterModule} from "@angular/router";
import {MatOption, MatSelect} from "@angular/material/select";
import {CustomerService} from "../../service/customer.service";

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
    imports: [
      MatDivider,
      MatFormField,
      MatButton,
      MatCard,
      RouterLink,
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
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent  implements OnInit{

  products=[]
  searchForm:FormGroup;


  constructor(private customerService:CustomerService,private  fb:FormBuilder,private  snackBar:MatSnackBar) {
  }

  ngOnInit(): void {
    this.searchForm=this.fb.group({
      title:['',[Validators.required]]
    })
    this.getAllProduct()
  }

  getAllProduct(){
    this.products=[];
    this.customerService.allProduct().subscribe((res)=>{
      res.data.forEach((element: { processImg: string; byteImage: string; })=>{
        element.processImg='data:image/jpeg;base64,'+element.byteImage
        this.products.push(element)
      });
    });
  }


  onSubmit(){
    const name=this.searchForm.get('title').value!
    this.products=[];
    this.customerService.allProductByName(name).subscribe((res)=>{
      res.data.forEach((element: { processImg: string; byteImage: string; })=>{
        element.processImg='data:image/jpeg;base64,'+element.byteImage
        this.products.push(element)
      });
    })
  }

  addToCart(id:any) {
    this.customerService.addToCart(id).subscribe((res)=>{
      this.snackBar.open("Cart Add Successfully", 'close', {
        duration: 5000
      });
    },(error=>{
      if(error.status){
        this.snackBar.open("Cart Already  Add Successfully", 'close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }else {
        this.snackBar.open('Error', 'close', {
          duration: 5000,
          panelClass: 'error-snackbar'

        })
      }

    }))

  }
}
