import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  constructor(private _HttpClient:HttpClient) { }
  getAllauthor():Observable<any>{
    return this._HttpClient.get("http://localhost:3000/authors");
  }
  getAuthorDetails(id:string):Observable<any>{
    return this._HttpClient.get(`http://localhost:3000/authors/${id}`);
  }
}
