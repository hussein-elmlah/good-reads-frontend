import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthorService {
    constructor(private http:HttpClient) { }

    getAllauthor(): Observable<any> {
        return this.http.get("https://good-reads-backend.onrender.com/authors");
    }

    getPopularAuthors(): Observable<any> {
        return this.http.get("https://good-reads-backend.onrender.com/authors/popular");
    }

    getAuthorDetails(id:string): Observable<any> {
        return this.http.get(`https://good-reads-backend.onrender.com/authors/${id}`);
    }
}
