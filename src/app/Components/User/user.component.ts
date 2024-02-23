import { Component } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { WelcomLoginComponent } from './welcom-login/welcom-login.component';
import { CategoriesComponent } from './categories/categories.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NavBarComponent,WelcomLoginComponent,RouterOutlet,RouterLink,RouterLinkActive,ReactiveFormsModule,CommonModule,LoginComponent,RegisterComponent,HttpClientModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  showLogin: boolean = false;
  showRegister: boolean = false;
}
