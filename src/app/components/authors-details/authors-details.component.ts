import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthorsService } from "../../services/authors.service";
import { NavBarComponent } from "../User/nav-bar/nav-bar.component";

@Component({
    selector: "app-author-details",
    standalone: true,
    imports: [CommonModule, NavBarComponent],
    templateUrl: "./authors-details.component.html",
    styleUrls: ["./authors-details.component.css"]
})
export class AuthorsDetailsComponent {
    id:any;
    author:any;
    constructor(private authorsServ:AuthorsService, private _activateRoute:ActivatedRoute, private _router:Router) {
        this.id = this._activateRoute.snapshot.params["authorId"];
        this.fetchData();
    }

    fetchData() {
        this.authorsServ.getAuthorById(this.id).subscribe(
            (data) => {
                this.author = data;
            },
            (error) => {
                if (error instanceof HttpErrorResponse) {
                    this._router.navigate(["/not-found"]);
                }
            }
        );
    }
}
