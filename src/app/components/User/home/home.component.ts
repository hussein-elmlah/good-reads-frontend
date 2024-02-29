import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";

import { BookService } from "../../../services/book.service";
import { PaginationComponent } from "../../pagination/pagination.component";
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [HttpClientModule, NavBarComponent, CommonModule, PaginationComponent],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.css"
})
export class HomeComponent {
    books: any[] = [];
    userid: any;
    itemsPerPage: number = 4; // Number of items to display per page
    currentPage: number = 1; // Current page
    totalPages: number[] = []; // Array to store total page numbers
    displayedBooks: any[] = []; // Array to store books to display on the current page
    booksToShow: any[] = [];
    selectedStatus: string = "all";
    constructor(private _bookService: BookService, private _router: Router, private httpclient: HttpClient) {}

    ngOnInit(): void {
        const token: any = localStorage.getItem("token");
        console.log(token);

        // Check if token is present and it's a string
        if (token && typeof token === "string") {
            const decode: any = jwtDecode(token);
            console.log(decode);
            this.userid = decode.id;
            console.log(this.userid);

            const headers = new HttpHeaders({
                authorization: token,
            });

            this.httpclient.get(`http://localhost:3000/user/${this.userid}/books`, { headers }).subscribe(
                (response: any) => {
                    this.selectBooks(this.userid, "all");
                },
                (error: any) => {
                    console.error("Failed to fetch books:", error);
                    // Handle error here
                }
            );
        } else {
            // Handle the case when token is not present or not a string
            console.error("Invalid or missing token");
            // You can handle this case by redirecting the user to login or any other appropriate action
        }
    }

    selectBooks(userId: number, status: string): void {
        if (status === "all") {
            // If status is "all", fetch all books for the user
            this._bookService.getAllUserBooks(userId).subscribe((data: any) => {
                this.books = data;
                console.log(this.books);
                this.updateDisplayedBooks();
            });
        } else {
            // If status is other than "all", fetch books based on the selected status
            this._bookService.getUserBooksByStatus(userId, status).subscribe((data: any) => {
                this.books = data;
                this.updateDisplayedBooks();
            });
        }
    }

    onPageChange(page: number): void {
        this.currentPage = page;
        this.updateDisplayedBooks();
    }

    updateDisplayedBooks(): void {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.displayedBooks = this.books.slice(startIndex, endIndex);
    }

    redirectToBook(bookId: string): void {
        this._router.navigate(["/books", bookId]);
    }

    redirectToAuthor(authorId: number): void {
        this._router.navigate(["/authors", authorId]);
    }
}
