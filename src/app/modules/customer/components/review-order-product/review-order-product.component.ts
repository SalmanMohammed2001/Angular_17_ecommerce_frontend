import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {CustomerService} from "../../service/customer.service";
import {StorageService} from "../../../../service/stroge/storage.service";
import {MatIcon} from "@angular/material/icon";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton, MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-review-order-product',
  standalone: true,
  imports: [
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
  templateUrl: './review-order-product.component.html',
  styleUrl: './review-order-product.component.scss'
})
export class ReviewOrderProductComponent {
  productId = this.activateRoute.snapshot.params["productId"]
  selectFile: any
  reviewForm!:FormGroup
  imagePreview: any

  constructor(private fb: FormBuilder,
              private route: Router,
              private snackBar: MatSnackBar,
              private customerService: CustomerService,
              private activateRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  };

  onFileSelected(event: any) {
    this.selectFile = event.target.files[0]
    this.previewImage();
  }


  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview=reader.result;
    }
    reader.readAsDataURL(this.selectFile)
  }

  submitForm() {
    const fromData = new FormData();

    fromData.append('img', this.selectFile);
    fromData.append('productId', this.productId);
    fromData.append('userId', StorageService.getUserId());
    // @ts-ignore
    fromData.append('rating', this.reviewForm.get('rating').value);
    // @ts-ignore
    fromData.append('description', this.reviewForm.get('description').value);

    this.customerService.giveReview(fromData).subscribe((res) => {

        this.snackBar.open('Review posted Successfully', 'close', {
          duration: 5000
        })
        this.route.navigateByUrl("/customer/myOrders").then()
    })

  }
}
