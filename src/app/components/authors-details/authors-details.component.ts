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
                this.fetchAuthorBooks();
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
                for(let i = 0; i < this.authorBooks.length; i++)
                {
                    this.authorBooks[i].avgRating = 0;
                    this.authorBooks[i].starsArray = [];
                    this.authorBooks[i].emptyStarsArray = [];
                    let j=0,k=0;
                    for(j; j < this.authorBooks[i].reviews.length; j++)
                    {
                        this.authorBooks[i].avgRating += this.authorBooks[i].reviews[j].rate;
                    }
                    this.authorBooks[i].avgRating /= j;
                    for( k = 0; k < this.authorBooks[i].avgRating; k++)
                    {
                        this.authorBooks[i].starsArray.push({});
                    }
                    for( k ; k < 5; k++)
                    {
                        this.authorBooks[i].emptyStarsArray.push({});
                    }
                }
            },
            (error) => {
                console.error('Error fetching author books:', error);
            }
        );
    }

    onStatusChange(status: string, bookId: string) {
        // Call the service function to update the book status
        this.authorsServ.updateBookStatus(status, bookId).subscribe(
            (response: any) => {
            // Handle success response
            console.log('Book status updated successfully:', response);
          },
          (error: any) => {
            // Handle error response
            console.error('Error updating book status:', error);
          }
        );
      }

}
