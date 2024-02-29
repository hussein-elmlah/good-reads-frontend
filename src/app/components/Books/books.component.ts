import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { Book } from "../../interfaces/books";
import { Category } from "../../interfaces/category";
import { BookService } from "../../services/book.service";
import { CategoriesDataService } from "../../services/categories.service";
import { PaginationComponent } from "../pagination/pagination.component";
import { NavBarComponent } from "../User/nav-bar/nav-bar.component";

@Component({
    selector: "app-books",
    standalone: true,
    imports: [PaginationComponent, NavBarComponent],
    templateUrl: "./books.component.html",
    styleUrl: "./books.component.css"
})
export class BooksComponent {
    category!: Category;
    books: Book[] = [];
    currentPage: number = 1;
    itemsPerPage: number = 8;

    constructor(
        private categoriesService: CategoriesDataService,
        private booksService: BookService,
        private router: Router
    ) { }

    ngOnInit(): void {
        const categoryId = this.router.routerState.snapshot.root.firstChild?.params["categoryId"];

        this.categoriesService.getCategoryById(categoryId).subscribe((category: Category) => {
            this.category = category;
        });

        this.booksService.getAllBooks().subscribe((books: Array<Book>) => {
            this.books = books;
        });
    }

    getPaginatedBooks(): Array<Book> {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.books.slice(startIndex, endIndex);
    }

    onPageChange(page: number): void {
        this.currentPage = page;
    }

    viewBookDetails(bookId: number): void {
        this.router.navigate(["/books", bookId]);
    }

    viewAuthor(authorId: number): void {
        this.router.navigate(["/authors", authorId]);
    }
}
