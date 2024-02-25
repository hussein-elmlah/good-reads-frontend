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
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { Category } from "../interfaces/category";

@Injectable({
    providedIn: "root"
})
export class CategoryService {
    private apiUrl = "http://localhost:3000/categories";

    constructor(private http: HttpClient) { }

    getCategories(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    // getCategories(page: number, pageSize: number, lastItemId?: number): Observable<Category[]> {
    //   let params = new HttpParams()
    //     .set('page', page.toString())
    //     .set('pageSize', pageSize.toString());

    //   if (lastItemId) {
    //     params = params.set('lastItemId', lastItemId.toString());
    //   }

    //   return this.http.get<any[]>(this.apiUrl, { params });
    // }

    addCategory(category: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, category);
    }

    // updateCategory(updateCategorynumber:number ,updatedCategory: any): Observable<any> {
    //     const url = `${this.apiUrl}/${updateCategorynumber}`;
    //     return this.http.put<any>(url, updatedCategory);
    // }
    updateCategory(updatedNumber: number, updatedCategory: string): Observable<any> {
        console.log('Updating category:', updatedCategory);
        const url = `${this.apiUrl}/${updatedNumber}`;
        return this.http.put<any>(url, { categoryName: updatedCategory });
    }
    
   
    deleteCategory(categoryId: number): Observable<any> {
        const url = `${this.apiUrl}/${categoryId}`;
        return this.http.delete<any>(url);
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
