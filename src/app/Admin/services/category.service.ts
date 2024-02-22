// category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
   
   
export class CategoryService {
   
  private apiurl = 'http://localhost:3000/categories'; // Adjust the URL based on your API endpoint

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiurl);
  }

  addCategory(category: any): Observable<any> {
    return this.http.post<any>(this.apiurl, category);
  }

  updateCategory(updatedCategory: any): Observable<any> {
    const url = `${this.apiurl}/${updatedCategory.id}`;
    return this.http.put<any>(url, updatedCategory);
  }

  deleteCategory(categoryId: number): Observable<any> {
    const url = `${this.apiurl}/${categoryId}`;
    return this.http.delete<any>(url);
  }
}