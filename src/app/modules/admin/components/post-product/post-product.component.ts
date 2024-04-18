import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatInput, MatInputModule} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {Router, RouterModule} from "@angular/router";
import {AdminService} from "../../service/admin.service";
import {StorageService} from "../../../../service/stroge/storage.service";

@Component({
  selector: 'app-post-product',
  standalone: true,
  imports: [
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
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.scss'
})
export class PostProductComponent implements OnInit {

  productForm: FormGroup;
  listOfCategory = []
  selectedFile: any
  imagePreview: any


  constructor(private fb: FormBuilder,
              private route: Router,
              private snackBar: MatSnackBar,
              private adminService: AdminService,
              private userServiceStorage: StorageService) {
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      categoryId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });

    this.getAllCategories();

  }

  private getAllCategories() {
    this.adminService.allCategory().subscribe((res) => {
      console.log(res.data)
      this.listOfCategory = res.data
    })
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
    this.previewImage();
  }

  previewImage() {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.imagePreview = fileReader.result
    }
    fileReader.readAsDataURL(this.selectedFile)
  }

  addProduct() {
    if(this.productForm.valid){
      const formData = new FormData();
      formData.append('img', this.selectedFile);
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('categoryId', this.productForm.get('categoryId')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);

      this.adminService.addProduct(formData).subscribe((res) => {
        this.snackBar.open("Product Posted Successfully", 'close', {
          duration: 5000
        });
        this.route.navigateByUrl("/admin/dashboard").then()
      }, (error => {
        this.snackBar.open('please select image', 'close', {
          duration: 5000,
          panelClass: 'error-snackbar'

        })
      }))
    }



  }


}
