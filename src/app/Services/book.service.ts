import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private _HttpClient: HttpClient) { }
  getAllBooks(): Observable<any> {
    return this._HttpClient.get("http://localhost:5000/books");
  }
  getDetailsBook(id: String): Observable<any> {
    return this._HttpClient.get(`http://localhost:5000/books/${id}`);
  }
  getAllUserBooks(id:string): Observable<any> {
    return this._HttpClient.get(`http://localhost:5000/users/userbook/${id}`);
  }
}
