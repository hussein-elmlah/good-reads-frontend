// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.get('assets/admin.json').pipe(
      map((user: any) => {
        const isValid = username === user.username && password === user.password;
        if (isValid) {
          const token = 'simulated_jwt_token'; // Simulated token 
          localStorage.setItem('token', token);
          this.isAuthenticatedSubject.next(true);
        }
        return isValid;
      }),
      
      catchError((error) => {
        console.error(error.message);
        return of(false); 
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
