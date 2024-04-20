import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatInput, MatInputModule} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {AdminService} from "../../service/admin.service";
import {StorageService} from "../../../../service/stroge/storage.service";

@Component({
  selector: 'app-updateproduct',
  standalone: true,
  imports: [
    MatIcon,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatInput,
    NgForOf,
    NgIf,
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
  templateUrl: './updateproduct.component.html',
  styleUrl: './updateproduct.component.scss'
})
export class UpdateproductComponent {

  productForm!: FormGroup
  listOfCategory: any = []
  /*  selectedFile:File | null;
    imagePreview:string | ArrayBuffer | null*/
  selectedFile: any
  imagePreview: any
  existingImage: any

  imgChange=false



  productId=this.activateRoute.snapshot.params["productId"];
  constructor(private fb: FormBuilder,
              private route: Router,
              private snackBar: MatSnackBar,
              private adminService: AdminService,
              private userServiceStroage: StorageService,
              private activateRoute:ActivatedRoute
  ) {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
    this.previewImage()

    this.imgChange=true
    this.existingImage=null;
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview=reader.result
    }
    reader.readAsDataURL(this.selectedFile)
  }

  ngOnInit(){
    this.productForm=this.fb.group({
      categoryId:[null,[Validators.required]],
      name:[null,[Validators.required]],
      price:[null,[Validators.required]],
      description:[null,[Validators.required]],
    });

    this.getAllCategories();
    this.getProductById()

  }
  getAllCategories(){
    this.adminService.allCategory().subscribe((res)=>{
      this.listOfCategory=res.data

    })
  }

  getProductById(){
    this.adminService.getProductById(this.productId).subscribe((res)=>{
      console.log(res)
      this.productForm.patchValue(res.data)
      this.existingImage='data:image/jpeg;base64,'+res.data.byteImage

    })
  }
  updateProduct(){
    const formData=new FormData();

    if(this.imgChange && this.selectedFile){
      formData.append('img',this.selectedFile);
    }

    formData.append('name',this.productForm.get('name')?.value);
    formData.append('categoryId',this.productForm.get('categoryId')?.value);
    formData.append('description',this.productForm.get('description')?.value);
    formData.append('price',this.productForm.get('price')?.value);

   /* console.log(formData.get('img'))
    console.log(formData.get('name'))
    console.log(formData.get('categoryId'))
    console.log(formData.get('description'))
    console.log(formData.get('price'))*/

    this.adminService.updateProduct(this.productId,formData).subscribe((res)=>{
        this.snackBar.open("Product update Successfully", 'close', {
          duration: 5000
        });
        this.route.navigateByUrl("/admin/dashboard").then()

    })
  }

  dataURLtoFile(dataurl:any, filename:any) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }
}
