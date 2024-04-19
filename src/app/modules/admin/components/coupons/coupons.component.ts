import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminService} from "../../service/admin.service";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf
  ],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss'
})
export class CouponsComponent  implements OnInit{

  coupons:any;

  constructor(private  fb:FormBuilder,
              private  router:Router,
              private snackbar:MatSnackBar,
              private adminService:AdminService
  ) {
  }

  ngOnInit(){
    this.getCoupons()

  }

  getCoupons() {
    this.adminService.getAllCoupon().subscribe((res)=>{
     this.coupons=res.data
      console.log(res)
    })
  }
}
