import { HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";

import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [HttpClientModule, NavBarComponent],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.css"
})
export class HomeComponent {

}