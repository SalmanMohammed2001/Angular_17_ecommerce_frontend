import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {AdminService} from "../../service/admin.service";
import {StorageService} from "../../../../service/stroge/storage.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-post-product-faq',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
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
  templateUrl: './post-product-faq.component.html',
  styleUrl: './post-product-faq.component.scss'
})
export class PostProductFaqComponent {
  productId:any=this.activateRoute.snapshot.params["productId"];

  FAQForm!:FormGroup
  constructor(private fb: FormBuilder,
              private route: Router,
              private snackBar: MatSnackBar,
              private adminService: AdminService,
              private userServiceStroage: StorageService,
              private activateRoute:ActivatedRoute
  ) {
  }

  ngOnInit(){
    this.FAQForm=this.fb.group({
      question:['',[Validators.required]],
      answer:['',[Validators.required]],
    })
    console.log(this.productId)
  }

  postFaq(){
    this.adminService.postFaq(this.productId,this.FAQForm.value).subscribe((res)=>{
      this.snackBar.open('Faq posted Successfully','close',{
        duration:5000
      })
      this.route.navigateByUrl("admin/dashboard").then()
    },(error=>{
      this.snackBar.open('Faq posted  Error','close',{
        duration:5000,
        panelClass:error
      })
    }))
  }
}
