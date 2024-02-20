import { CommonModule , } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule ,FormBuilder,Validators,FormControl } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AbstractControl, FormGroup } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-welcom-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,RouterLinkActive,CommonModule, LoginComponent,RegisterComponent],
  templateUrl: './welcom-login.component.html',
  styleUrl: './welcom-login.component.css'
})
export class WelcomLoginComponent {
  showLogin: boolean = false;
  showRegister: boolean = false;
  
}
