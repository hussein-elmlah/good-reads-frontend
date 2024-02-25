import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import {
    FormBuilder, FormGroup, ReactiveFormsModule, Validators
} from "@angular/forms";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

import { AuthService } from "../../../Services/auth.service";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, RouterLinkActive, CommonModule, HttpClientModule],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.css"
})
export class LoginComponent {
    FormBuilder: any;
    constructor(private _AuthService:AuthService, private _Router:Router, private _FormBuilder:FormBuilder) {}
    errMsg:string = "";
    isLoading:boolean = false;

    loginForm:FormGroup = this._FormBuilder.group({
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]]
    },);
    /*
  loginForm:FormGroup = new FormGroup({

    email:new FormControl('',[
      Validators.required,
      Validators.email]),
    password:new FormControl('',[
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
  }, )
*/

    handleForm():void {
        this.isLoading = true;
        const userData = this.loginForm.value;
        if (this.loginForm.valid === true) {
            this._AuthService.login(userData).subscribe({
                next: (response) => {
                    console.log(response);
                    if (response.message == "success") {
                        localStorage.setItem("token", response.token);
                        this._AuthService.decodeUser();
                        this.isLoading = false;
                        this._Router.navigate(["/home"]);
                    }
                },
                error: (err) => {
                    console.log(err);
                    this.errMsg = err.error.message;
                    this.isLoading = false;
                }
            });
        }
    }
}
