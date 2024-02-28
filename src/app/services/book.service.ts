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
         // return this._HttpClient.get("https://freetestapi.com/api/v1/books");
      }
    getDetailsBook(id: string): Observable<any> {
        return this._HttpClient.get(`http://localhost:3000/books/${id}`);
    }
    getAllUserBooks(id:string): Observable<any> {
        return this._HttpClient.get(`http://localhost:3000/user/${id}/books`);
    }
    getBooksByStatus(status:String):Observable<any>{
        return this._HttpClient.get(`http://localhost:3000/books?status=${status}`);
    
    }
    SearchBooks(query: string) {
        return this._HttpClient.get<any[]>(`http://localhost:3000/books/search?query=${query}`);
      }
}
