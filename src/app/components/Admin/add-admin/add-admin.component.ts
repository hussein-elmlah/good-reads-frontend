import { CommonModule } from "@angular/common";
import {
    Component, OnInit
} from "@angular/core";
import {
    FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent implements OnInit {


username: string = '';
password: string = '';
confirmPassword: string = '';
errorMessage: string = '';
successMessage: string = ''; 

constructor(private adminService: AuthService) {
  console.log('Component constructor is called');

}

ngOnInit(): void {
  console.log('ngOnInit is called'); 
  this.resetForm(); // Reset the form when the component is initialized

}

resetForm(): void {
  this.username = '';
  this.password = '';
  this.confirmPassword = '';
  this.errorMessage = '';
  this.successMessage = '';
}

passwordsMatch(): boolean {
  return this.password === this.confirmPassword;
}
register(): void {
  this.errorMessage = ''; 
  this.successMessage = ''; 
  if (this.username.length < 5) {
    this.errorMessage = 'Username must be at least 5 characters long.';
    return;
  }

  if (this.password.length < 8) {
    this.errorMessage = 'Password must be at least 8 characters long.';
    return;
  }

  if (!this.passwordsMatch()) {
    this.errorMessage = 'Password and Confirm Password do not match.';
    return;
  }

  const usernamePattern = /^[a-zA-Z0-9_.-]+$/;
  if (!usernamePattern.test(this.username)) {
    this.errorMessage = 'Invalid username format.';
    return;
  }

  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=?/.]).*$/;
  if (!passwordPattern.test(this.password)) {
    this.errorMessage = 'Invalid password format. Please check the requirements.';
    return;
  }

  this.adminService.register(this.username, this.password).subscribe(
    (response) => {
      console.log('Registration successful!', response);
      this.successMessage = 'Registration successful!';
    },
    (error) => {
      if (error && error.error && error.error.message) {
        this.errorMessage = error.error.message;
      } else if (error && error.error) {
        this.errorMessage = error.error;
      } else {
        console.error('Registration failed. Error:', error);
        console.log('Actual error response:', error);
        this.errorMessage = 'An unexpected error occurred. Please try again later.';
      }
    }
  );
}
}