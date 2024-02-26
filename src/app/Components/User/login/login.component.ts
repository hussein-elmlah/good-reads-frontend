import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule ,AbstractControl, FormBuilder, FormControl, FormGroup,  Validators, FormControlOptions } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavBarComponent, RouterLink,ReactiveFormsModule,RouterLinkActive,CommonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  FormBuilder: any;
  constructor(private _AuthService:AuthService , private _Router:Router ,private _FormBuilder:FormBuilder){}
  errMsg:string=''
  isLoading:boolean=false

  loginForm:FormGroup=this._FormBuilder.group({
    username:['',[ Validators.required,Validators.minLength(3),Validators.maxLength(15)]]
   
   , password:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{8,30}$/)]]
  },)


  handleForm():void {
    this.isLoading=true
    const userData=this.loginForm.value;
    if (this.loginForm.valid === true){
      this._AuthService.login(userData).subscribe({
        next:(response)=>{
          console.log(response);
          console.log(response.token);
          
          if(response.token){
           localStorage.setItem('token',response.token)
           this._AuthService.decodeUser()
            this.isLoading=false
            this._Router.navigate(['/home'])
          }
          
        },
        error:(err)=>{
          console.log(err);
          this.errMsg=err.error.message
          this.isLoading=false
          
        }
      })
    }
  }

}
