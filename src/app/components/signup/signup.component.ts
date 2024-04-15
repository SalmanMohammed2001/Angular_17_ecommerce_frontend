import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {Router, RouterLink} from "@angular/router";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {AuthService} from "../../service/auth/auth.service";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatIcon,
    MatSnackBarModule,
    MatFormField,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    MatButtonModule, MatDividerModule, MatIconModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm!: FormGroup
  hidePassword = true


  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      // confirmPassword:['',[Validators.required]],
    })

  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword
  }

  onSubmit() {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    const email = this.signupForm.get('email')?.value

    /* if(password!==confirmPassword){
        this.snackBar.open("password do not match.",'close',{
         duration:5000,panelClass:'error-snackbar'
       })*/

    this.authService.register(this.signupForm.value).subscribe((response: any) => {
      this.snackBar.open('sign up successful!', 'close', {duration: 5000})
      this.router.navigateByUrl("/login").then();
    }, (error: any) => {
      this.snackBar.open("sign up failed please try again.", 'close', {
        duration: 5000, panelClass: 'error-snackbar'
      })
    })




  }

}
