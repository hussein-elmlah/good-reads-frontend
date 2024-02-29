import { HttpClient, HttpHeaders } from "@angular/common/http";
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
    getAllUserBooks(userId:number): Observable<any> {
        const token: any = localStorage.getItem("token");
        const headers = new HttpHeaders({
            authorization: token,
        });
        return this._HttpClient.get(`http://localhost:3000/user/${userId}/books`, { headers });
    }
    getUserBooksByStatus(userId: number, status: string): Observable<any> {
        const token: any = localStorage.getItem("token");
        const headers = new HttpHeaders({
            authorization: token,
        });
        return this._HttpClient.get(`http://localhost:3000/user/${userId}/books?status=${status}`, { headers });
    }
    getBooksByStatus(status:string):Observable<any> {
        return this._HttpClient.get(`http://localhost:3000/books?status=${status}`);
    }
    SearchBooks(query: string) {
        return this._HttpClient.get<any[]>(`http://localhost:3000/books/search?query=${query}`);
    }
}
