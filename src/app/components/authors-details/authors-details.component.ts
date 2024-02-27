import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthorsService } from "../../services/authors.service";
import { NavBarComponent } from "../User/nav-bar/nav-bar.component";
import { Author } from "../../interfaces/author";
import { Book } from "../../interfaces/books";

@Component({
    selector: "app-author-details",
    standalone: true,
    imports: [CommonModule, NavBarComponent],
    templateUrl: "./authors-details.component.html",
    styleUrls: ["./authors-details.component.css"]
})
export class AuthorsDetailsComponent {
    _id:any;
    author:Author | undefined;
    authorBooks: any[] = [];
    constructor(private authorsServ:AuthorsService, private _activateRoute:ActivatedRoute, private _router:Router) {
        this._id = this._activateRoute.snapshot.params["authorId"];
        this.fetchData();
    }

    fetchData() {
        this.authorsServ.getAuthorById(this._id).subscribe(
            (data) => {
                this.author = data;
                const authorBooks = this.fetchAuthorBooks();
            },
            (error) => {
                if (error instanceof HttpErrorResponse) {
                    this._router.navigate(["/not-found"]);
                }
            }
        );
    }

    fetchAuthorBooks() {
        this.authorsServ.getAuthorBooks(this._id).subscribe(
            (data) => {
                this.authorBooks = data;
            },
            (error) => {
                console.error('Error fetching author books:', error);
            }
        );
    }

}
