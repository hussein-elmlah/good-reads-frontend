import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

import { BookService } from "../../../services/book.service";
import { AuthService } from "../../services/auth.service";
import { jwtDecode } from "jwt-decode";
import { SearchPipe } from "../../../pipe/search.pipe";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-nav-bar",
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive,SearchPipe , FormsModule],
    templateUrl: "./nav-bar.component.html",
    styleUrl: "./nav-bar.component.css"
})
export class NavBarComponent  {
    searchQuery: string = "";
    searchResults: any[] = [];
    username: any;
    userimg: any;
    books:any[]=[];
    term:string='';
    
    constructor(private _Router: Router, private _bookService: BookService, private _auth: AuthService) { }

    ngOnInit(): void {
        this._bookService.getAllBooks().subscribe((data: any) => {
            this.books = data; // Assign to this.categories
            console.log(data);
            this.books ;
        });
        const token: any = localStorage.getItem("token");

        // Check if token is present and it's a string
        if (token && typeof token === "string") {
            const decode: any = jwtDecode(token);
            this.username = decode.username;
           
        }}


  

    signOut(): void {
        localStorage.removeItem("token");
        this._Router.navigate(["/"]);
    }
    viewBookDetails(bookId: number): void {
        this._Router.navigate(["/books", bookId]);
    }


    viewAuthor(authorId: number): void {
        this._Router.navigate(["/authors", authorId]);
    }
}
