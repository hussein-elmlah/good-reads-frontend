import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { RegisterComponent } from "./register/register.component";
import { WelcomLoginComponent } from "./welcom-login/welcom-login.component";

@Component({
    selector: "app-user",
    standalone: true,
    imports: [NavBarComponent, WelcomLoginComponent, RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule, LoginComponent, RegisterComponent, HttpClientModule],
    templateUrl: "./user.component.html",
    styleUrl: "./user.component.css"
})
export class UserComponent {
    showLogin: boolean = false;
    showRegister: boolean = false;
}
