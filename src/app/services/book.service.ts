import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class BookService {
    constructor(private _HttpClient: HttpClient) { }
    getAllBooks(): Observable<any> {
        return this._HttpClient.get("http://localhost:3000/books");
    }
    getDetailsBook(id: string): Observable<any> {
        return this._HttpClient.get(`http://localhost:3000/books/${id}`);
    }
    getAllUserBooks(id:string): Observable<any> {
        return this._HttpClient.get(`http://localhost:3000/user/${id}/books`);
    }
}