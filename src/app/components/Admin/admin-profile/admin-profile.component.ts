import { Component } from "@angular/core";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";
// import { AdminloginComponent } from "./components/Admin/admin-login/admin-login.component";

@Component({
    selector: "app-admin-profile",
    standalone: true,
    imports: [RouterLink, RouterLinkActive, RouterOutlet , CommonModule ],
    templateUrl: "./admin-profile.component.html",
    styleUrl: "./admin-profile.component.css"
})
export class AdminProfileComponent {
    
    constructor(private authService: AuthService, private router: Router) {}

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/admin']); // Navigate to your login page or any other desired route
    }

    isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }
}
