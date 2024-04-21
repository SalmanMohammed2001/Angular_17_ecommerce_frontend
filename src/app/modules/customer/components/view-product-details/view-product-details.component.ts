import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterModule} from "@angular/router";
import {CustomerService} from "../../service/customer.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton, MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-view-product-details',
  standalone: true,
  imports: [
    NgIf,
    MatIcon,
    NgForOf,
    MatSnackBarModule,
    MatIcon,
    MatFormField,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    NgIf,
    MatInput,
    MatButton,
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
  templateUrl: './view-product-details.component.html',
  styleUrl: './view-product-details.component.scss'
})
export class ViewProductDetailsComponent  implements OnInit{

  productId=this.activateRoute.snapshot.params["productId"]
  product:any;
  FAQS:any[]=[];
  reviews:any[]=[]
  constructor(private  activateRoute:ActivatedRoute,private customerService:CustomerService,private snackBar:MatSnackBar) {
  }

  ngOnInit(): void {
    this.getProductDetailsById();
  }
  getProductDetailsById(){
    this.customerService.getProductDetailsById(this.productId).subscribe((res=>{
      console.log(res)
      this.product=res.data.productDto

      this.FAQS=res.data.faqDtoList;

      this.reviews=res.data.reviewDtoList


      /*  res.reviewDtoList.forEach((element: { processImg: string; returnImg: string; })=>{
            element.processImg='data:image/jpeg;base64,'+element.returnImg
          // @ts-ignore
          this.reviews.push(element)

        })*/

    }));
  }

  addToWishList() {
    /*    const wishListDto={
          productId:this.productId,
          userId:this.userStorageService.getUserId()
        }
        this.customerService.addProductWishList(wishListDto).subscribe((res)=>{
          if (res.id != null) {
            this.snackBar.open('Product Add WishList Successfully', 'close', {
              duration: 5000
            })

          } else {
            this.snackBar.open('Already Add WishList', 'error', {
              duration: 5000
            })
          }
        })
      }*/
  }


}
