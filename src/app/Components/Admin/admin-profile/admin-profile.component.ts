import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
    selector: "app-admin-profile",
    standalone: true,
    imports: [RouterLink, RouterLinkActive, RouterOutlet],
    templateUrl: "./admin-profile.component.html",
    styleUrl: "./admin-profile.component.css"
})
export class AdminProfileComponent {

}
