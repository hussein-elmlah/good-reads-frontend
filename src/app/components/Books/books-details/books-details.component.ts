import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

import { Book } from "../../../interfaces/books";
import { BookService } from "../../../services/book.service";
import { TokenService } from "../../../services/token.service";
import { UserService } from "../../../services/user.service";
import { NavBarComponent } from "../../User/nav-bar/nav-bar.component";

@Component({
    selector: "app-books-details",
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule, NavBarComponent],
    templateUrl: "./books-details.component.html",
    styleUrl: "./books-details.component.css"
})
export class BooksDetailsComponent {
    book!: Book;
    bookId: number = 0;
    userBooks: Array<any> = [];

    constructor(
        private bookService: BookService,
        private userService: UserService,
        private router: Router,
        private activateRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.bookId = this.activateRoute.snapshot.params["bookId"];

        this.bookService.getDetailsBook(this.bookId).subscribe({
            next: (book) => {
                this.book = book;

                console.log(book.reviews);
            },
            error: (error) => {
                if (error instanceof HttpErrorResponse) {
                    this.router.navigate(["/not-found"]);
                }
            }
        });

        this.userService.getUserBooks().subscribe({
            next: (userBooks) => {
                this.userBooks = userBooks;
                const userBook = this.userBooks.find((b: Book) => b._id === this.bookId);
                if (userBook) {
                    this.book.book_status = userBook.book_status;
                }
            },
            error: (error) => {
                console.error("Error fetching user books: ", error);
            }
        });
    }

    getStars(rating?: number): Array<number> {
        if (!this.book.rating) {
            this.book.rating = 0;
        }
        return Array.from({ length: Math.floor(rating || this.book.rating) }, (_, index) => index + 1);
    }

    async onStatusChange(bookId: number, status: string) {
        const userBooksIds = this.userBooks.map((book) => book._id);
        let userBooks;
        try {
            if (userBooksIds.includes(bookId)) {
                if (["reading", "toRead", "read"].includes(status)) {
                    await this.userService.updateBookStatus(bookId, status).toPromise();
                    return;
                }
                userBooks = await this.userService.getUserBooks().toPromise();
                console.log("userBooks before filtering: ", userBooks);
                userBooks = userBooks.filter((book: { _id: number; }) => book._id === bookId);
                console.log("userBooks after filtering: ", userBooks);
            } else {
                userBooks = this.userBooks;
                const newBook = { _id: bookId, book_status: status };
                userBooks.push(newBook);
            }
            await this.userService.updateUserBooks(userBooks).toPromise();
        } catch (error) {
            console.error("Error updating userBook:", error);
        }
    }
}
