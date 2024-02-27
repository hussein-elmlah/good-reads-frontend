import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class CategoriesDataService {
    constructor(private http: HttpClient) {
    }

    getCategories(): Observable<any> {
        return this.http.get("http://localhost:3000/categories");
    }
}
