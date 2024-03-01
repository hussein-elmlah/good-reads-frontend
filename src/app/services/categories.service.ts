import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class CategoriesDataService {
    constructor(private http: HttpClient) { }

    getCategories(): Observable<any> {
        return this.http.get("https://good-reads-backend.onrender.com/categories");
    }

    getPopularCategories(): Observable<any> {
        return this.http.get("https://good-reads-backend.onrender.com/categories/popular");
    }

    getCategoryById(id: number): Observable<any> {
        return this.http.get(`https://good-reads-backend.onrender.com/categories/${id}`);
    }
}
