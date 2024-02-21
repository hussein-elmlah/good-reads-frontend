// import { Component } from '@angular/core';
import { Component, ErrorHandler, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [RouterLink,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminloginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError!: string | null ;
  formSubmitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe((success) => {
        if (success) {
          this.router.navigate(['/adminProfile']);
        } else {
          
          // console.log('Invalid login credentials');
          this.loginError = 'Invalid username or password';

        }
        (error: any) => {
          console.error(error);
          // Handle other errors if needed
        }
        
      });
    }
    else {
      this.loginError = null;
    }
  }
}