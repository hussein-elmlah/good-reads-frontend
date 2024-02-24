import { Component } from "@angular/core";

import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
    selector: "app-books",
    standalone: true,
    imports: [NavBarComponent],
    templateUrl: "./books.component.html",
    styleUrl: "./books.component.css"
})
export class BooksComponent {

}
