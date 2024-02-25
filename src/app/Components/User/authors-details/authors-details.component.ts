import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Author } from "../interfaces/author.model";
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
    selector: "app-authors-details",
    standalone: true,
    imports: [CommonModule, NavBarComponent],
    templateUrl: "./authors-details.component.html",
    styleUrl: "./authors-details.component.css"
})

export class AuthorsDetailsComponent implements OnInit {
    author!: Author;
    authorId!: number;

    constructor(private http: HttpClient, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.authorId = +params["authorId"];
            this.fetchAuthorDetails(this.authorId);
        });
    }

    fetchAuthorDetails(authorId: number): void {
        //   this.http.get<Author>(`http://localhost:3000/authors/${authorId}`)
        //     .subscribe(author => this.author = author);
        // Replace HTTP request with static data
        this.author = {
            id: 1, firstName: "Ahmed", lastName: "Ali", dob: "1987-03-15", photo: "https://randomuser.me/api/portraits/men/1.jpg"
        };
    }
}
