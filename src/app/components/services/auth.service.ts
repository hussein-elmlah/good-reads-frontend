// import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { BehaviorSubject, Observable, of, throwError } from "rxjs";
// import { catchError, map } from "rxjs/operators";

// @Injectable({
//     providedIn: "root",
// })
// export class AuthService {
//     private apiUrl = "http://localhost:3000/admin/login";
//     private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
//     isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

//     constructor(private http: HttpClient) {}

//     login(username: string, password: string): Observable<boolean> {
//         const credentials = { username, password };
        

//         return this.http.post<{ token: string }>(this.apiUrl, credentials , {headers}).pipe(
//             map((response) => {
//                 console.log(response)
//                 const { token } = response;
//                 if (token) {
//                     localStorage.setItem("token", token);
//                     this.isAuthenticatedSubject.next(true);
//                     return true;
//                 }
//                 this.isAuthenticatedSubject.next(false);
//                 return false;
//             }),
//             catchError((error: HttpErrorResponse) => {
//                 if (error.status === 404) {
//                     console.error("User not found.");
//                 } else {
//                     console.error("An error occurred:", error.message);
//                 }
//                 this.isAuthenticatedSubject.next(false);
//                 return of(false);
//             })
//         );
//     }

//     logout(): void {
//         localStorage.removeItem("token");
//         this.isAuthenticatedSubject.next(false);
//     }

//     // isAuthenticated(): boolean {
//     //     return !!localStorage.getItem("token");
//     // }
//     function isAuthenticated(): boolean {
//         const token = localStorage.getItem('token');
//         console.log("Token:", token);
    
//         if (!token) {
//             console.error('Token not found in local storage.');
//             throwError('Token not found in local storage.');
//             return false;
//         }
    
//         // If you need to use the token for some other purpose, you can store it in a global variable or service.
//         // For example, you can create a AuthService with a BehaviorSubject to store and access the token.
    
//         // authService.setToken(token);
    
//         const headers = new HttpHeaders({
//             'authorization': token,
//         });
    
//         // Perform additional logic if needed with the headers.
    
//         return true;
//     }
// }
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private apiUrl = "http://localhost:3000/admin/login";
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient) {}

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        console.log("Token:", token);

        if (!token) {
            console.error('Token not found in local storage.');
            throwError('Token not found in local storage.');
            return false;
        }

        const headers = new HttpHeaders({
            'authorization': token,
        });

        // Perform additional logic if needed with the headers.

        return true;
    }

    login(username: string, password: string): Observable<boolean> {
        const credentials = { username, password };
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token not found in local storage.');
            throwError('Token not found in local storage.');
            return of(false);
        }

        const headers = new HttpHeaders({
            'authorization': token,
        });

        return this.http.post<{ token: string }>(this.apiUrl, credentials, { headers }).pipe(
            map((response) => {
                console.log(response);
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
}
