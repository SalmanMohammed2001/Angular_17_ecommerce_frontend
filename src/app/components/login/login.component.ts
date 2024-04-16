import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../service/auth/auth.service";
import {Router, RouterLink} from "@angular/router";
import {StorageService} from "../../service/stroge/storage.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!:FormGroup

  token:any
  constructor(private  fb:FormBuilder,
              private snackBar:MatSnackBar,
              private authService:AuthService,
              private router:Router,
              private userStorage:StorageService

  ) {
  }
  ngOnInit(){
    this.loginForm=this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]],

    })

  }

  onSubmit() {
    const email = this.loginForm.get('email')?.value
    const password = this.loginForm.get('password')?.value
    this.authService.login(email,password).subscribe((res:any)=>{
      this.userStorage.saveToken(res.body.data.token);
      this.userStorage.saveUser(res.body.data);

     this.snackBar.open("Login success",'Ok',{duration:5000});

     if(StorageService.getRole()=="ADMIN"){
       this.router.navigateByUrl("/admin/dashboard").then();
     }else {
       this.router.navigateByUrl("/customer/dashboard").then();
     }

    },(error:any)=>{
      this.snackBar.open("Bad Credentials",'ERROR',{duration:5000});
    })

  }
}
