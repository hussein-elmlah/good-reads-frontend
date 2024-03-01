import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class BookService {
    constructor(private http: HttpClient) { }

    getAllBooks(): Observable<any> {
        return this.http.get("https://good-reads-backend.onrender.com/books");
    }

    getDetailsBook(id: number): Observable<any> {
        return this.http.get(`https://good-reads-backend.onrender.com/books/${id}`);
    }

    getAllUserBooks(userId:number): Observable<any> {
        const token: any = localStorage.getItem("token");
        const headers = new HttpHeaders({
            authorization: token,
        });
        return this.http.get(`https://good-reads-backend.onrender.com/user/${userId}/books`, { headers });
    }

    getUserBooksByStatus(userId: number, status: string): Observable<any> {
        const token: any = localStorage.getItem("token");
        const headers = new HttpHeaders({
            authorization: token,
        });
        return this.http.get(`https://good-reads-backend.onrender.com/user/${userId}/books?status=${status}`, { headers });
    }

    getBooksByStatus(status:string):Observable<any> {
        return this.http.get(`https://good-reads-backend.onrender.com/books?status=${status}`);
    }

    SearchBooks(query: string) {
        return this.http.get<any[]>(`https://good-reads-backend.onrender.com/books/search?query=${query}`);
    }
    getPopularBooks() {
        return this.http.get<any[]>(`https://good-reads-backend.onrender.com/books/popular`);
    }
}
