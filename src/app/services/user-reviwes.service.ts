import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserReviwesService {

  constructor(private _HttpClient:HttpClient) {} 
  updateReview(reviewObj:any,bookID:any):Observable<any>{
    return this._HttpClient.put(`http://localhost:3000/user/userbooks/${bookID}`,reviewObj);
  }
  getBookOfUSer(slectObj:any):Observable<any>{
    return this._HttpClient.post(`http://localhost:3000/user/userbooks`,slectObj); 
}
}
