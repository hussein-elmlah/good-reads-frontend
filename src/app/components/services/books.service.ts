import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

import { Author } from "../../interfaces/author";
import { Book } from "../../interfaces/books";
import { Category } from "../../interfaces/category";

@Injectable({
    providedIn: "root"
})
export class BokksService {
    private apiUrl = "https://good-reads-backend.onrender.com/books";
    private authorsUrl = "https://good-reads-backend.onrender.com/authors";
    private categoriesUrl = "https://good-reads-backend.onrender.com/categories";

    constructor(private http: HttpClient) {}
    getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(this.apiUrl);
    }

    getAuthors(): Observable<Author[]> {
        return this.http.get<Author[]>(this.authorsUrl);
    }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.categoriesUrl);
    }
    // addBook(book: Book): Observable<any> {
    //     return this.http.post<any>(this.apiUrl, book);
    // }

    // updateBook(updatedBook: Book): Observable<any> {
    //     const url = `${this.apiUrl}/${updatedBook.id}`;
    //     const { id, ...bookWithoutId } = updatedBook;

    //     return this.http.put<any>(url, bookWithoutId);
    // }

    // deleteBook(bookId: number): Observable<any> {
    //     const url = `${this.apiUrl}/${bookId}`;
    //     return this.http.delete<any>(url);
    // }
    addBook(book: Book): Observable<any> {
        const token = localStorage.getItem("token");
        console.log("Token:", token);

        if (!token) {
            console.error("Token not found in local storage.");
            return throwError("Token not found in local storage.");
        }
        const headers = new HttpHeaders({
            authorization: token,
        });
        return this.http.post(`${this.apiUrl}`, book, { headers });
    }

    updateBook(book: Book): Observable<any> {
        const token = localStorage.getItem("token");
        console.log("Token:", token);

        if (!token) {
            console.error("Token not found in local storage.");
            return throwError("Token not found in local storage.");
        }
        const headers = new HttpHeaders({
            authorization: token,
        });
        return this.http.put(`${this.apiUrl}/${book._id}`, book, { headers });
    }

    deleteBook(bookId: number): Observable<any> {
        const token = localStorage.getItem("token");
        console.log("Token:", token);

        if (!token) {
            console.error("Token not found in local storage.");
            return throwError("Token not found in local storage.");
        }
        const headers = new HttpHeaders({
            authorization: token,
        });
        return this.http.delete(`${this.apiUrl}/${bookId}`, { headers });
    }
}
