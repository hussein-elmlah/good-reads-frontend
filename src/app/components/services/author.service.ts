import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

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
        return this.http.post<any>(this.apiUrl, author);
    }
    updateAuthor(updatedAuthor: Author): Observable<any> {
        const url = `${this.apiUrl}/${updatedAuthor._id}`;
        // Omit the id from the payload to avoid redundant data in the request body
        const { _id, ...authorWithoutId } = updatedAuthor;

        return this.http.put<any>(url, authorWithoutId);
    }

    deleteAuthor(authorId: number): Observable<any> {
        const url = `${this.apiUrl}/${authorId}`;
        return this.http.delete<any>(url);
    }
}