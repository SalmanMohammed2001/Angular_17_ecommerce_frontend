import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {AdminService} from "../../service/admin.service";
import {StorageService} from "../../../../service/stroge/storage.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton, MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-postcategory',
  standalone: true,
  imports: [
    FormsModule,
    MatSnackBarModule,
    RouterModule,
    MatFormField,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatInput,
    MatButton,
  ],
  templateUrl: './postcategory.component.html',
  styleUrl: './postcategory.component.scss'
})
export class PostcategoryComponent implements OnInit{

  categoryForm!: FormGroup

  constructor(private fb: FormBuilder, private route: Router, private snackBar: MatSnackBar,
              private adminService: AdminService, private storageService: StorageService) {
  }


  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

  addCategory(){
  if (this.categoryForm.valid){
    if (this.categoryForm.valid) {
      this.adminService.addCategory(this.categoryForm.value).subscribe((res) => {

          this.snackBar.open("Category Posted Successfully", 'close', {
            duration: 5000
          });
          this.route.navigateByUrl("/admin/dashboard").then()

      },(error)=>{
        if (error.status==406){
          this.snackBar.open("Category Name Already Defined",'ERROR',{duration:5000});
          this.categoryForm = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
          })
        }else {
          this.snackBar.open("Bad Credentials",'close',{duration:5000});
        }

      })
    }

  }

  }



 }
