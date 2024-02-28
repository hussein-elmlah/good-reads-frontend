import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";

import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { jwtDecode } from "jwt-decode";
import { BookService } from "../../../Services/book.service";
import { CommonModule } from "@angular/common";
import { PaginationComponent } from "../../pagination/pagination.component";;
import { Router } from "@angular/router";


@Component({
    selector: "app-home",
    standalone: true,
    imports: [HttpClientModule, NavBarComponent,CommonModule, PaginationComponent ],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.css"
})
export class HomeComponent {
    books: any[] = [];
    userID: any;
    itemsPerPage: number = 4; // Number of items to display per page
    currentPage: number = 1; // Current page
    totalPages: number[] = []; // Array to store total page numbers
    displayedBooks: any[] = []; // Array to store books to display on the current page
    booksToShow: any[] = [];
    constructor(private _BookService: BookService , private _Router:Router) {}
  
    ngOnInit(): void {
      const token: any = localStorage.getItem("userToken");
      let decode: any = jwtDecode(token);
      this.userID = decode.user_id;
      this.selectBooks("all");
    }
  
    selectBooks(selectOption: any) {
      this._BookService.getBooksByStatus(selectOption).subscribe((data: any) => {
        this.books = data;
        console.log(data);
        this.updateDisplayedBooks();
        // Update books to show after fetching
      });
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
    this._Router.navigate(["/:bookId", bookId]);
}

redirectToAuthor(authorId: number): void {
  this._Router.navigate(["/:authorId", authorId]);
}
  }