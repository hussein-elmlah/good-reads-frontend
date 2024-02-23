import { Injectable } from '@angular/core';
import { HttpClientModule ,HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable, } from 'rxjs';
import { Router } from '@angular/router';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
 
  constructor(private _HttpClient: HttpClient) {}
  
  baseUrl:string =`https://route-ecommerce.onrender.com/api/v1/auth/`;

    register(userData:Object):Observable<any>{
      return this._HttpClient.post(this.baseUrl + 'signup',userData)
    }

    login(userData:Object):Observable<any>{
      return this._HttpClient.post(this.baseUrl + 'signin',userData)
    }
  }
