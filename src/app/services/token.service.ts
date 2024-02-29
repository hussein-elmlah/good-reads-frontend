import { Injectable } from "@angular/core";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface DecodedToken extends JwtPayload {
    id: number;
}

@Injectable({
    providedIn: "root"
})
export class TokenService {
    getUserIdFromToken(): number {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in local storage.");
            throw new Error("Token not found in local storage.");
        }
        const decodedToken: DecodedToken = jwtDecode(token);
        return decodedToken.id;
    }
}
