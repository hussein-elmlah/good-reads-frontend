import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { Author } from "../interfaces/author";
import { Book } from "../interfaces/books";
import { Category } from "../interfaces/category"; // Import Category interface
import { BokksService } from "../services/books.service";

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
    categories: Category[] = []; // Use Category interface

    newBook: Book = {
        name: "", category: "", authors: "", image: ""
    };
    selectedBook: Book = {
        name: "", category: "", authors: "", image: ""
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
            name: "", category: "", authors: "", image: ""
        };
        this.modalService.open(this.addBookModal, { centered: true });
    }

    saveBook(): void {
        if (
            this.newBook.name.trim() !== '' &&
            this.newBook.category.trim() !== '' &&
            this.newBook.authors.length > 0){
        this.bookService.addBook(this.newBook).subscribe(
            (response) => {
                console.log("Book saved successfully:", response);
                this.loadBooks();
                this.modalService.dismissAll();
            },
            (error) => {
                console.error("Error saving book:", error);
                this.newBookValidationMessage = "Error saving book. Please try again.";
            }
        );
       
        }
        else {
            this.newBookValidationMessage =
              ' Book Name, Category, and Authors are required.';
          }
    }

    openUpdateBookModal(content: any, book: Book): void {
        this.selectedBook = { ...book };
        this.modalService.open(content, { centered: true });
    }

    updateBook(): void {
        if (
          this.selectedBook.name.trim() !== '' &&
          this.selectedBook.category.trim() !== '' &&
          this.selectedBook.authors.length > 0)
         {
          this.bookService.updateBook(this.selectedBook).subscribe(
            (response: any) => {
              console.log('Book updated successfully:', response);
              this.loadBooks();
              this.modalService.dismissAll();
            },
            (error: any) => {
              console.error('Error updating book:', error);
            }
          );
        } else {
          this.updateBookValidationMessage =
            'Updated Book Name, Category, and Authors are required.';
        }
      }
    

    deleteBook(bookId: number): void {
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
            this.newBook.image = url;
        });
    }

    handleUpdatedImageUpload(event: any): void {
        const file = event.target.files[0];
        this.uploadImage(file, (url: string) => {
            this.selectedBook.image = url;
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
          return authors.map(author => `${author.firstName} ${author.lastName}`).join(', ');
        } else if (authors) {
          return `${authors.firstName} ${authors.lastName}`;
        } else {
          return '';
        }
      }
      
}