import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import { Book } from "../interfaces/books";

@Injectable({
    providedIn: "any"
})
export class AuthorsService {
    baseURL = "http://localhost:3000";

    constructor(private http: HttpClient) { }

    getAuthorBooks(authorId: any): Observable<Book[]> {
        authorId = Number(authorId);
        const url = `${this.baseURL}/books`;
        return this.http.get<Book[]>(url).pipe(
            map((books: any[]) => books.filter((book) => book.author_id == authorId))
        );
    }

    limit = 8;
    currentPage = 1;
    getAuthors(): Observable<any> {
        return this.http.get(`${this.baseURL}/authors/?page=${this.currentPage}&limit=${this.limit}`);
    }

    getAuthorById(id:number): Observable<any> {
        return this.http.get(`${this.baseURL}/authors/${id}`);
    }
}
