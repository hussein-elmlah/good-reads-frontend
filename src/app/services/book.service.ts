import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class BookService {
    constructor(private http: HttpClient) { }

    getAllBooks(): Observable<any> {
        return this.http.get("http://localhost:3000/books");
    }

    getDetailsBook(id: number | string): Observable<any> {
        return this.http.get(`http://localhost:3000/books/${id}`);
    }

    getAllUserBooks(userId:number): Observable<any> {
        const token: any = localStorage.getItem("token");
        const headers = new HttpHeaders({
            authorization: token,
        });
        return this.http.get(`http://localhost:3000/user/${userId}/books`, { headers });
    }

    getUserBooksByStatus(userId: number, status: string): Observable<any> {
        const token: any = localStorage.getItem("token");
        const headers = new HttpHeaders({
            authorization: token,
        });
        return this.http.get(`http://localhost:3000/user/${userId}/books?status=${status}`, { headers });
    }

    getBooksByStatus(status:string):Observable<any> {
        return this.http.get(`http://localhost:3000/books?status=${status}`);
    }

    SearchBooks(query: string) {
        return this.http.get<any[]>(`http://localhost:3000/books/search?query=${query}`);
    }
}
