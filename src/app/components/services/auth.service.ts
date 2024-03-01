import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private apiUrl = "https://good-reads-backend.onrender.com/admin/login";
    private signUpurl = "https://good-reads-backend.onrender.com/admin/register"
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<boolean> {
        const credentials = { username, password };
        

        return this.http.post<{ token: string }>(this.apiUrl, credentials ).pipe(
            map((response) => {
                console.log(response)
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



    register(username: string, password: string): Observable<any> {
        const token = localStorage.getItem('token');
        console.log("Token:", token);
    
        if (!token) {
            console.error('Token not found in local storage.');
            return throwError('Token not found in local storage.');
        }
        const headers = new HttpHeaders({
            'authorization': token,
        });
      const body = { username, password };
      return this.http.post(this.signUpurl, body , {headers});
    }
      
      
   
}







