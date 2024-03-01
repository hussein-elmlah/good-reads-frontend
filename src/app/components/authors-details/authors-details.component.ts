import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

import { Author } from "../../interfaces/author";
import { AuthorsService } from "../../services/authors.service";
import { BookService } from "../../services/book.service";
import { TokenService } from "../../services/token.service";
import { UserService } from "../../services/user.service";
import { NavBarComponent } from "../User/nav-bar/nav-bar.component";

@Component({
    selector: "app-author-details",
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule, NavBarComponent],
    templateUrl: "./authors-details.component.html",
    styleUrls: ["./authors-details.component.css"]
})
export class AuthorsDetailsComponent implements OnInit {
    _id: any;
    author: Author | undefined;
    authorBooks: any[] = [];
    userBooks: any[] = [];
    displayedBooks: any[] = [];

    constructor(
        private authorsServ: AuthorsService,
        private tokenService: TokenService,
        private bookService: BookService,
        private userService: UserService,
        private _activateRoute: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit() {
        this._id = this._activateRoute.snapshot.params["authorId"];
        this.fetchData();
        this.fetchUserBooks(); // Add this line
    }

    userId = this.tokenService.getUserIdFromToken();

    fetchData() {
        this.authorsServ.getAuthorById(this._id).subscribe(
            (data) => {
                this.author = data;
                this.fetchAuthorBooks();
            },
            (error) => {
                if (error instanceof HttpErrorResponse) {
                    this._router.navigate(["/not-found"]);
                }
            }
        );
    }

    fetchAuthorBooks() {
        this.authorsServ.getAuthorBooks(this._id).subscribe(
            (data) => {
                this.authorBooks = data;
                for (let i = 0; i < this.authorBooks.length; i++) {
                    this.authorBooks[i].avgRating = 0;
                    this.authorBooks[i].starsArray = [];
                    this.authorBooks[i].emptyStarsArray = [];
                    let j = 0; let k = 0;
                    for (j; j < this.authorBooks[i].reviews.length; j++) {
                        this.authorBooks[i].avgRating += this.authorBooks[i].reviews[j].rate;
                    }
                    this.authorBooks[i].avgRating /= j;
                    for (k = 0; k < this.authorBooks[i].avgRating; k++) {
                        this.authorBooks[i].starsArray.push({});
                    }
                    for (k; k < 5; k++) {
                        this.authorBooks[i].emptyStarsArray.push({});
                    }
                }
                this.updateDisplayedBooks();
            },
            (error) => {
                console.error("Error fetching author books:", error);
            }
        );
    }

    fetchUserBooks() {
        this.bookService.getAllUserBooks(this.userId).subscribe(
            (userBooks) => {
                this.userBooks = userBooks;
                this.updateDisplayedBooks();
            },
            (error) => {
                console.error("Error fetching user books:", error);
            }
        );
    }

    updateDisplayedBooks() {
        this.displayedBooks = this.authorBooks.map((book) => ({ ...book }));
        this.updateBookStatus();
    }

    updateBookStatus() {
        this.displayedBooks.forEach((book) => {
            const userBook = this.userBooks.find((userBook) => userBook._id === book._id);
            if (userBook) {
                book.book_status = userBook.book_status;
            }
        });
    }

    onStatusChange(bookId: number, status: string) {
        this.userService.updateBookStatus(bookId, status).subscribe(
            (response: any) => {},
            (error: any) => {}
        );
    }
}
