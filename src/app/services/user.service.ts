import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { TokenService } from "./token.service";

@Injectable({
    providedIn: "root"
})
export class UserService {
    constructor(private http: HttpClient, private tokenService: TokenService) {}

    token = localStorage.getItem("token") ?? ""; // Provide default empty string if token is null
    userId = this.tokenService.getUserIdFromToken();

    getUserBooks(): Observable<any> {
        const headers = new HttpHeaders().set("Authorization", this.token);
        return this.http.get(`http://localhost:3000/user/${this.userId}/books`, { headers });
    }

    updateUserBooks(userBooks: any): Observable<any> {
        const headers = new HttpHeaders().set("Authorization", this.token);
        return this.http.patch(`http://localhost:3000/user/${this.userId}/books`, { books: userBooks }, { headers });
    }

    updateReview(reviewObj:any, bookID:any):Observable<any> {
        return this.http.put(`http://localhost:3000/user/userbooks/${bookID}`, reviewObj);
    }

    getBookOfUSer(slectObj:any):Observable<any> {
        return this.http.post("http://localhost:3000/user/userbooks", slectObj);
    }

    updateBookStatus(bookId: number, status: string): Observable<any> {
        const userId = this.tokenService.getUserIdFromToken();

        const statusValues = ["read", "toRead", "reading"];
        if (!statusValues.includes(status)) {
            console.log(status);
        }

        const requestBody = {
            book_status: status,
        };

        const queryParams = `?status=${status}`;

        console.log(`update book status to : ${status}`);

        return this.http.patch(`http://localhost:3000/user/${userId}/${bookId}${queryParams}`, requestBody);
    }
}
