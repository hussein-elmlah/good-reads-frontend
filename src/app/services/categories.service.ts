import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class CategoriesDataService {
    constructor(private http: HttpClient) {}

    getCategories(): Observable<any> {
        return this.http.get("http://localhost:3000/categories");
    }
<<<<<<< HEAD
   getPopularCategories(): Observable<any> {
    return this.http.get("http://localhost:3000/categories/popular");
  }
=======

    getCategoryById(id: number): Observable<any> {
        return this.http.get(`http://localhost:3000/categories/${id}`);
    }
>>>>>>> 79d5d799f40b85283eaf4b651834de791e3b7bb5
}
