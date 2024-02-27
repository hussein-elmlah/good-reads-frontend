import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private apiUrl = "http://localhost:3000/admin/login";
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<boolean> {
        const credentials = { username, password };

        return this.http.post<{ token: string }>(this.apiUrl, credentials).pipe(
            map((response) => {
                const { token } = response;
                if (token) {
                    localStorage.setItem("token", token);
                    this.isAuthenticatedSubject.next(true);
                    return true;
                }
                this.isAuthenticatedSubject.next(false);
                return false;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 404) {
                    console.error("User not found.");
                } else {
                    console.error("An error occurred:", error.message);
                }
                this.isAuthenticatedSubject.next(false);
                return of(false);
            })
        );
    }

    logout(): void {
        localStorage.removeItem("token");
        this.isAuthenticatedSubject.next(false);
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem("token");
    }
}
