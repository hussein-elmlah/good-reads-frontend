import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { Observable, } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(private _HttpClient: HttpClient) {}

    userInfo:any;

    baseUrl:string = "https://route-ecommerce.onrender.com/api/v1/auth/";

    register(userData:Object):Observable<any> {
        return this._HttpClient.post(`${this.baseUrl}signup`, userData);
    }

    login(userData:Object):Observable<any> {
        return this._HttpClient.post(`${this.baseUrl}signin`, userData);
    }

    decodeUser():void {
        const encode = localStorage.getItem("token");
        if (encode !== null) {
            const decode = jwtDecode(encode);
            this.userInfo = decode;
            console.log(decode);
        }
    }
}
