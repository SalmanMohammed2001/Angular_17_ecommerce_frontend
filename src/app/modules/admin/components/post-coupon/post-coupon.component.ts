import { Component } from '@angular/core';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput, MatInputModule} from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {Router, RouterModule} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {AdminService} from "../../service/admin.service";
import {MatNativeDateModule} from "@angular/material/core";
import {MatBadgeModule} from "@angular/material/badge";
import {MatIconModule} from "@angular/material/icon";
import {CdkOverlayOrigin} from "@angular/cdk/overlay";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatCard} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {
  MatCell,
  MatColumnDef, MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow,
  MatRowDef, MatTable, MatTableModule
} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-post-coupon',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    FormsModule,
    MatBadgeModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    CdkOverlayOrigin,
    MatSelect,
    MatOption,
    MatCard,
    MatDivider,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatRowDef,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatTableModule, MatPaginatorModule, MatMenuTrigger, MatMenu
  ],
  templateUrl: './post-coupon.component.html',
  styleUrl: './post-coupon.component.scss'
})
export class PostCouponComponent {

  couponForm!:FormGroup;

  constructor(private  fb:FormBuilder,
              private  router:Router,
              private snackbar:MatSnackBar,
              private adminService:AdminService
  ) {
  }
  ngOnInit(){
    this.couponForm=this.fb.group({
      name:['',[Validators.required]],
      code:['',[Validators.required]],
      discount:['',[Validators.required]],
      expirationDate:['',[Validators.required]],
    })
  }

  addCoupon(){
    this.adminService.addCoupon(this.couponForm.value).subscribe((res)=>{
      this.snackbar.open("Coupon Posted Successfully", 'close', {
        duration: 5000
      });
      this.router.navigateByUrl("/admin/dashboard").then()
    },(error=>{
      if (error.status==406){
        this.snackbar.open("Coupon code AllReady Added ", 'close', {
          duration: 5000,
        });

      }
    }))
  }
}

