import { CommonModule, } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink, RouterLinkActive } from "@angular/router";

import { AuthorService } from "../../../services/author.service";
import { BookService } from "../../../services/book.service";
import { LoginComponent } from "../login/login.component";
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { RegisterComponent } from "../register/register.component";

@Component({
    selector: "app-welcom-login",
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, RouterLinkActive, CommonModule, LoginComponent, RegisterComponent, NavBarComponent, HttpClientModule],
    templateUrl: "./welcom-login.component.html",
    styleUrl: "./welcom-login.component.css"
})
export class WelcomLoginComponent implements OnInit {
    constructor(private _BookService:BookService) {}
    books:any[] = [];

    ngOnInit(): void {
        this._BookService.getAllBooks().subscribe({
            next: (response) => {
                console.log(response.books);
                this.books = response.books;
            }
        });
    }
    showLogin: boolean = false;
    showRegister: boolean = false;
}
