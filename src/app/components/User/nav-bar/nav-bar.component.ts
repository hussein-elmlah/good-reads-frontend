import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

import { BookService } from "../../../services/book.service";
import { AuthService } from "../../services/auth.service";
import { jwtDecode } from "jwt-decode";

@Component({
    selector: "app-nav-bar",
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: "./nav-bar.component.html",
    styleUrl: "./nav-bar.component.css"
})
export class NavBarComponent  {
    searchQuery: string = "";
    searchResults: any[] = [];
    username: any;
    userimg: any;
    
    constructor(private _Router: Router, private _bookService: BookService, private _auth: AuthService) { }

    ngOnInit(): void {
        const token: any = localStorage.getItem("token");

        // Check if token is present and it's a string
        if (token && typeof token === "string") {
            const decode: any = jwtDecode(token);
            this.username = decode.username;
           
        }}


    SearchBooks(): void {
        if (this.searchQuery.trim() !== "") {
            this._bookService.SearchBooks(this.searchQuery).subscribe((data: any) => {
                this.searchResults = data;
                console.log(data);
            });
        } else {
            this.searchResults = [];
        }
    }

    signOut(): void {
        localStorage.removeItem("token");
        this._Router.navigate(["/"]);
    }
}
