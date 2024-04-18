import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {MatDivider} from "@angular/material/divider";
import {MatFormField} from "@angular/material/form-field";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {RouterLink, RouterModule} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-admin-dashboard',
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
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent  implements OnInit{

  products=[]
  searchForm:FormGroup;


  constructor(private adminService:AdminService,private  fb:FormBuilder,private  snackBar:MatSnackBar) {
  }

  ngOnInit(): void {
    this.searchForm=this.fb.group({
      title:['',[Validators.required]]
    })
    this.getAllProduct()
  }

  getAllProduct(){
    this.products=[];
    this.adminService.allProduct().subscribe((res)=>{
      res.data.forEach((element: { processImg: string; byteImage: string; })=>{
        element.processImg='data:image/jpeg;base64,'+element.byteImage
        this.products.push(element)
      });
    });
  }

  onSubmit(){
  const name=this.searchForm.get('title').value!
    this.products=[];
    this.adminService.allProductByName(name).subscribe((res)=>{
      res.data.forEach((element: { processImg: string; byteImage: string; })=>{
        element.processImg='data:image/jpeg;base64,'+element.byteImage
        this.products.push(element)
      });
    })
  }

  onDelete(id:any){
    console.log(id)
    if(confirm("are you want delete")){
      this.adminService.deleteProduct(id).subscribe((res)=>{
        this.snackBar.open("Product Posted Successfully", 'close', {
          duration: 5000
        });
        this.getAllProduct()
      },(error=>{
        this.snackBar.open('Error', 'close', {
          duration: 5000,
          panelClass: 'error-snackbar'

        })
      }))

    }

  }
}
