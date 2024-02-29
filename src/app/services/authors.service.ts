import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { map, Observable, throwError } from "rxjs";

import { Book } from "../interfaces/books";
import { TokenService } from "./token.service";

interface DecodedToken extends JwtPayload {
    id: number;
}
@Injectable({
    providedIn: "any"
})
export class AuthorsService {
    baseURL = "http://localhost:3000";

    constructor(private _HttpClient:HttpClient, private tokenService: TokenService) { }

    getAuthorBooks(authorId: any): Observable<Book[]> {
        authorId = Number(authorId);
        const url = `${this.baseURL}/books`;
        return this._HttpClient.get<Book[]>(url).pipe(
            map((books: any[]) => books.filter((book) => book.author_id == authorId))
        );
    }

    limit = 8;
    currentPage = 1;
    getAuthors():Observable<any> {
        return this._HttpClient.get(`${this.baseURL}/authors/?page=${this.currentPage}&limit=${this.limit}`);
    // return this.dummyData();
    }

    getAuthorById(id:number):Observable<any> {
        return this._HttpClient.get(`${this.baseURL}/authors/${id}`);
    // const dummyAuthors = this.dummyData();
    // return dummyAuthors.pipe( map((authors: any[]) => authors[1]) );
    }

    // getPopularAuthors(options:any): Observable<any>{
    //   return this._HttpClient.get(`${this.baseURL}/authors/all/popular`, options)
    // }

    updateBookStatus(bookId: string, status: string): Observable<any> {
        const userId = this.tokenService.getUserIdFromToken();

        const statusValues = ["read", "toRead", "reading"];
        if (!statusValues.includes(status)) {
            console.log(status);
            return throwError("Invalid status value.");
        }

        const requestBody = {
            book_status: status,
        };

        const queryParams = `?status=${status}`;

        console.log(`update book status to : ${status}`);

        return this._HttpClient.put(`${this.baseURL}/user/${userId}/${bookId}${queryParams}`, requestBody);
    }
}
