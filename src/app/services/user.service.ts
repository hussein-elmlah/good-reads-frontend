import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { TokenService } from "./token.service";

@Injectable({
    providedIn: "root"
})
export class UserService {
    constructor(private _HttpClient: HttpClient, private tokenService: TokenService) {}

    token = localStorage.getItem("token") ?? ""; // Provide default empty string if token is null
    userId = this.tokenService.getUserIdFromToken();

    getUserBooks(): Observable<any> {
        const headers = new HttpHeaders().set("Authorization", this.token);
        return this._HttpClient.get(`http://localhost:3000/user/${this.userId}/books`, { headers });
    }

    updateUserBooks(userBooks: any): Observable<any> {
        const headers = new HttpHeaders().set("Authorization", this.token);
        return this._HttpClient.patch(`http://localhost:3000/user/${this.userId}/books`, { books: userBooks }, { headers });
    }
}
