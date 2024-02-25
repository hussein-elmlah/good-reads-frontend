import { Injectable } from '@angular/core';
import { HttpClientModule ,HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable, } from 'rxjs';
import { Router } from '@angular/router';
import { __values } from 'tslib';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService  {
 
  constructor(private _HttpClient: HttpClient) {}

  userInfo:any;
  baseUrl:string=`http://localhost:5000/user/`
  //baseUrl:string =`https://route-ecommerce.onrender.com/api/v1/auth/`;

    register(userData:Object):Observable<any>{
      return this._HttpClient.post(this.baseUrl + 'register',userData)
     // return this._HttpClient.post(this.baseUrl + '/register',userData)
    }

    login(userData:Object):Observable<any>{
      return this._HttpClient.post(this.baseUrl + 'login',userData)
      //return this._HttpClient.post(this.baseUrl + '/login',userData)
    }

    decodeUser():void{
      const encode =localStorage.getItem('token')
      if (encode!== null){
        const decode = jwtDecode(encode)
        this.userInfo=decode
        console.log(decode);
        
      }
    }
  }
