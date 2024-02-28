import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

import { Author } from "../../interfaces/author";

@Injectable({
    providedIn: "root"
})
export class AuthorService {
    private apiUrl = "http://localhost:3000/authors";

    constructor(private http: HttpClient) {}

    getAuthors(): Observable<Author[]> {
        return this.http.get<Author[]>(this.apiUrl);
    }

    addAuthor(author: Author): Observable<any> {
        const token = localStorage.getItem('token');
        console.log("Token:", token);
    
        if (!token) {
            console.error('Token not found in local storage.');
            return throwError('Token not found in local storage.');
        }
        const headers = new HttpHeaders({
            'authorization': token,
        });
        return this.http.post<any>(this.apiUrl, author , {headers});
    }
    updateAuthor(updatedAuthor: Author): Observable<any> {
        const url = `${this.apiUrl}/${updatedAuthor._id}`;
        // Omit the id from the payload to avoid redundant data in the request body
        const { _id, ...authorWithoutId } = updatedAuthor;

        return this.http.put<any>(url, authorWithoutId);
    }

    deleteAuthor(authorId: number): Observable<any> {
        const token = localStorage.getItem('token');
        console.log("Token:", token);
    
        if (!token) {
            console.error('Token not found in local storage.');
            return throwError('Token not found in local storage.');
        }
        const headers = new HttpHeaders({
            'authorization': token,
        });
        const url = `${this.apiUrl}/${authorId}`;
        return this.http.delete<any>(url,{headers});
    }
}