import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private _HttpClient:HttpClient) { }
  getAllCateogries():Observable<any>{
    return this._HttpClient.get("http://localhost:5000/categories");
    

  }
  getCateogryDetails(id:String):Observable<any>{
    return this._HttpClient.get(`http://localhost:5000/categories/${id}`);
  }
}
