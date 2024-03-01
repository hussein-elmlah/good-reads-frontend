import { CommonModule, } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink, RouterLinkActive } from "@angular/router";

import { AuthorService } from "../../../services/author.service";
import { BookService } from "../../../services/book.service";
import { CategoriesDataService } from "../../../services/categories.service";
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
    constructor(private _BookService:BookService, private categoryService:CategoriesDataService, private authorService:AuthorService) {}
    
    books:any[] = [];
    authors: any[] = [];
    categories:any[] = [];
    book:any=[]

    ngOnInit(): void {
        this._BookService.getPopularBooks().subscribe({
            next: (response) => {
                console.log("Response:", response);
                if (response && Array.isArray(response)) {
                    console.log("Books:", response);
                    this.books=response;
                  
                    
                    this.books = this.books.slice(0, 8);
                }
                 else {
                    console.error("Invalid response or missing books array.");
                }
            },
            error: (error) => {
                console.error("Error fetching books:", error);
            }
        });

        this.categoryService.getPopularCategories().subscribe((data: any) => {
            this.categories = data; // Assign to this.categories
            console.log(data);
            this.categories = this.categories.slice(0, 8);
        });

        this.authorService.getPopularAuthors().subscribe((data: any) => {
            this.authors = data; // Assign to this.categories
            console.log(data);
            this.authors = this.authors.slice(0, 8);
        });
    }
    
  

    showLogin: boolean = false;
    showRegister: boolean = false;
}
