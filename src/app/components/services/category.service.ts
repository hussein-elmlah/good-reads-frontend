
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class CategoryService {
    private apiUrl = "http://localhost:3000/categories";

    constructor(private http: HttpClient) { }
    

    getCategories(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    addCategory(category: any): Observable<any> {
        const token = localStorage.getItem('token');
        console.log("Token:", token);
    
        if (!token) {
            console.error('Token not found in local storage.');
            return throwError('Token not found in local storage.');
        }
        const headers = new HttpHeaders({
            'authorization': token,
        });
    
        return this.http.post<any>(this.apiUrl, category,{ headers });
    }

    updateCategory(updatedNumber: number, updatedCategory: string): Observable<any> {
        const token = localStorage.getItem('token');
        console.log("Token:", token);
    
        if (!token) {
            console.error('Token not found in local storage.');
            return throwError('Token not found in local storage.');
        }
        const headers = new HttpHeaders({
            'authorization': token,
        });
        const url = `${this.apiUrl}/${updatedNumber}`;
        return this.http.put<any>(url, { name: updatedCategory },{headers});
    }
    
    
    deleteCategory(categoryId: number): Observable<any> {
        const token = localStorage.getItem('token');
        console.log("Token:", token);
    
        if (!token) {
            console.error('Token not found in local storage.');
            return throwError('Token not found in local storage.');
        }
    
        const url = `${this.apiUrl}/${categoryId}`;
    
        const headers = new HttpHeaders({
            'authorization': token,
        });
    
        return this.http.delete<any>(url, { headers });
    }

   

}
