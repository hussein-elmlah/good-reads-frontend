import { CommonModule , } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule ,FormBuilder,Validators,FormControl } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AbstractControl, FormGroup } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../Services/auth.service';
import { BookService } from '../../../Services/book.service';
import { AuthorService } from '../../../Services/author.service';
import { CategoriesService } from '../../../Services/categories.service';

@Component({
  selector: 'app-welcom-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,RouterLinkActive,CommonModule, LoginComponent,RegisterComponent,NavBarComponent,HttpClientModule],
  templateUrl: './welcom-login.component.html',
  styleUrl: './welcom-login.component.css'
})
export class WelcomLoginComponent implements OnInit{
constructor(private _BookService:BookService , _AuthorService:AuthorService , _CategoriesService:CategoriesService ){}
books:any[]=[]

  ngOnInit(): void {
    this._BookService.getAllBooks().subscribe({
      next:(response)=>{
     console.log(response.books);
     this.books=response.books

      }
    })
  }
  showLogin: boolean = false;
  showRegister: boolean = false;


  
}
