import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { Author } from "../../../interfaces/author";
import { Book } from "../../../interfaces/books";
import { Category } from "../../../interfaces/category"; // Import Category interface
import { BokksService } from "../../services/books.service";

@Component({
    selector: "app-admin-books",
    standalone: true,
    imports: [FormsModule, CommonModule, FormsModule, RouterLink, NgbModule, ReactiveFormsModule],
    templateUrl: "./admin-books.component.html",
    styleUrl: "./admin-books.component.css"
})
export class AdminBooksComponent {
    books: Book[] = [];
    authors: Author[] = [];
    categories: Category[] = [];

    newBook: Book = {
        name: "",
        //   category_id: "",
        category: [],
        author: [],
        img: "",
    };

    selectedBook: Book = {
        name: "",
        //   category_id: "",
        category: [],
        author: [],
        img: "",
    };

    newBookValidationMessage: string = "";
    updateBookValidationMessage: string = "";

    @ViewChild("addBookModal") addBookModal: any;

    constructor(private modalService: NgbModal, private bookService: BokksService) {}

    ngOnInit(): void {
        this.loadBooks();
        this.loadAuthors();
        this.loadCategories();
    }

    loadBooks(): void {
        this.bookService.getBooks().subscribe(
            (books: Book[]) => {
                this.books = books;
            },
            (error: any) => {
                console.error("Error loading books:", error);
            }
        );
    }

    loadAuthors(): void {
        this.bookService.getAuthors().subscribe(
            (authors: Author[]) => {
                this.authors = authors;
            },
            (error: any) => {
                console.error("Error loading authors:", error);
            }
        );
    }

    loadCategories(): void {
        this.bookService.getCategories().subscribe(
            (categories: Category[]) => {
                this.categories = categories;
            },
            (error: any) => {
                console.error("Error loading categories:", error);
            }
        );
    }

    openAddBookModal(): void {
        this.newBook = {
            name: "",
            category: [],
            author: [],
            img: "",
        };
        this.modalService.open(this.addBookModal, { centered: true });
    }

    saveBook(): void {
        console.log("Debug - newBook:", this.newBook);
        console.log("Debug - newBook.category:", this.newBook.category);
        this.newBook.category = [this.newBook.category];

        if (
            this.newBook.name.trim() !== ""
      && this.newBook.category.length > 0
      && this.newBook.author.length > 0
        ) {
            this.newBook.category_id = Number(this.newBook.category_id);

            this.bookService.addBook(this.newBook).subscribe(
                (response: any) => {
                    console.log("Book saved successfully:", response);
                    this.loadBooks();
                    this.modalService.dismissAll();
                },
                (error: any) => {
                    console.error("Error saving book:", error);
                    if (error instanceof HttpErrorResponse) {
                        console.error("Server returned:", error.error);
                    }
                    this.newBookValidationMessage = "Error saving book. Please try again.";
                }
            );
        } else {
            this.newBookValidationMessage = "Book Name, Category, and Authors are required.";
        }
    }

    updateBook(): void {
        console.log("Debug - newBook:", this.newBook);
        console.log("Debug - newBook.category:", this.newBook.category);
        this.newBook.category = [this.newBook.category];
        if (
            this.selectedBook.name.trim() !== ""
      && this.selectedBook.category.length > 0
      && this.selectedBook.author.length > 0
        ) {
        // this.newBook.category_id = Number(this.newBook.category_id);
            this.bookService.updateBook(this.selectedBook).subscribe(
                (response: any) => {
                    console.log("Book updated successfully:", response);
                    this.loadBooks();
                    this.modalService.dismissAll();
                },
                (error: any) => {
                    console.error("Error updating book:", error);
                }
            );
        } else {
            this.updateBookValidationMessage = "Updated Book Name, Category, and Authors are required.";
        }
    }

    openUpdateBookModal(content: any, book: Book): void {
        this.selectedBook = { ...book };
        this.modalService.open(content, { centered: true });
    }

    deleteBook(bookId: number): void {
        console.log("Deleting book with ID:", bookId);

        this.bookService.deleteBook(bookId).subscribe(
            (response: any) => {
                console.log("Book deleted successfully:", response);
                this.loadBooks();
            },
            (error: any) => {
                console.error("Error deleting book:", error);
            }
        );
    }

    handleImageUpload(event: any): void {
        const file = event.target.files[0];
        this.uploadImage(file, (url: string) => {
            this.newBook.img = url;
        });
    }

    handleUpdatedImageUpload(event: any): void {
        const file = event.target.files[0];
        this.uploadImage(file, (url: string) => {
            this.selectedBook.img = url;
        });
    }

    private uploadImage(file: File, callback: (url: string) => void): void {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const imageUrl = e.target.result;
            callback(imageUrl);
        };
        reader.readAsDataURL(file);
    }

    getAuthorNames(authors: Author[] | Author): string {
        if (Array.isArray(authors)) {
            return authors.map(
                (author) => `${author.firstName} ${author.lastName}`
            ).join(", ");
        } if (authors) {
            return `${authors.firstName} ${authors.lastName}`;
        }
        return "";
    }
}
