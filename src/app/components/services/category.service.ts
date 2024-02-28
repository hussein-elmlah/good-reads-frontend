// // category.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import { Category } from '../interfaces/category';

// @Injectable({
//   providedIn: 'root'
// })

// export class CategoryService {

//   private apiurl = 'http://localhost:3000/categories'; // Adjust the URL based on your API endpoint

//   constructor(private http: HttpClient) { }

//   getCategories(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiurl);
//   }

//   addCategory(category: any): Observable<any> {
//     return this.http.post<any>(this.apiurl, category);
//   }

//   updateCategory(updatedCategory: any): Observable<any> {
//     const url = `${this.apiurl}/${updatedCategory.id}`;
//     return this.http.put<any>(url, updatedCategory);
//   }

//   deleteCategory(categoryId: number): Observable<any> {
//     const url = `${this.apiurl}/${categoryId}`;
//     return this.http.delete<any>(url);
//   }
// }

// category.service.ts
// category.service.ts
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
    
    // deleteCategory(categoryId: number): Observable<any> {
        
    //     const token = localStorage.getItem('token');
    //         console.log("ddddddddddddddddddddddd", token)

    //     if (!token) {
    //         // Handle the case where token is null
    //         console.error('Token not found in local storage.');
    //         return throwError('Token not found in local storage.');
    //     }

    //     const url = `${this.apiUrl}/${categoryId}`;

    //     // Include token in headers
    //     const headers = new HttpHeaders({
    //         'token': token,
    //     });

    //     // Pass headers as an options object
    //     return this.http.delete<any>(url, { headers });
    // }
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
    
        // Pass headers as an options object
        return this.http.delete<any>(url, { headers });
    }

    // updateCategory(categoryId: number, updatedCategory: any): Observable<any> {
    //     console.log('Updating category with ID:', categoryId);
    //     console.log('Updated category:', updatedCategory);
      
    //     const url = `${this.apiUrl}/${categoryId}`;
    //     return this.http.put<any>(url, updatedCategory);
    //   }
      

    ////////////////////////////////////////////////////////


    // updateCategory(categoryId: number , updatedCategory:any): Observable<any> {
    //     const url = `${this.apiUrl}/${categoryId}`;
    //     return this.http.put<any>(url, updatedCategory);
    // }

}
