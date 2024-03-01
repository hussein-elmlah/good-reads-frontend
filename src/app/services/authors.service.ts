import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, throwError } from "rxjs";

import { Book } from "../interfaces/books";
import { TokenService } from "./token.service";

@Injectable({
    providedIn: "any"
})
export class AuthorsService {
    baseURL = "http://localhost:3000";

    constructor(private _HttpClient: HttpClient, private tokenService: TokenService) { }

    getAuthorBooks(authorId: any): Observable<Book[]> {
        authorId = Number(authorId);
        const url = `${this.baseURL}/books`;
        return this._HttpClient.get<Book[]>(url).pipe(
            map((books: any[]) => books.filter((book) => book.author_id == authorId))
        );
    }

    limit = 8;
    currentPage = 1;
    getAuthors(): Observable<any> {
        return this._HttpClient.get(`${this.baseURL}/authors/?page=${this.currentPage}&limit=${this.limit}`);
    }

    getAuthorById(id: number): Observable<any> {
        return this._HttpClient.get(`${this.baseURL}/authors/${id}`);
    }

    updateBookStatus(bookId: string, status: string): Observable<any> {
        const token = localStorage.getItem("token");
        const userId = this.tokenService.getUserIdFromToken();

        const statusValues = ["read", "toRead", "reading"];
        if (!statusValues.includes(status)) {
            return throwError("Invalid status value.");
        }

        const requestBody = {
            book_status: status,
        };

        const queryParams = `?status=${status}`;

        const headers = new HttpHeaders().set('Authorization', token || ''); // Ensure token is not null
        return this._HttpClient.put(`${this.baseURL}/user/${userId}/${bookId}${queryParams}`, requestBody, { headers });
    }
}
