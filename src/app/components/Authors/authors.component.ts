import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { Author } from "../../interfaces/author.model";
import { AuthorsService } from "../../services/authors.service";
import { PaginationComponent } from "../pagination/pagination.component";
import { NavBarComponent } from "../User/nav-bar/nav-bar.component";

@Component({
    selector: "app-authors",
    standalone: true,
    imports: [CommonModule, PaginationComponent, NavBarComponent],
    styleUrls: ["./authors.component.css"],
    templateUrl: "./authors.component.html",
    providers: [HttpClient]
})
export class AuthorsComponent {
    authors: Author[] = [];
    currentPage: number = 1;
    itemsPerPage: number = 8;

    constructor(private http: HttpClient, private router: Router, private authorsService: AuthorsService) { }

    ngOnInit(): void {
        this.fetchAuthors();
    }

    fetchAuthors() {
        this.getAuthors().subscribe((data: Author[]) => {
            this.authors = data;
        });
    }

    getAuthors() {
        return this.authorsService.getAuthors();
    }

    getPaginatedAuthors(): Author[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.authors.slice(startIndex, endIndex);
    }

    onPageChange(page: number): void {
        this.currentPage = page;
    }

    redirectToAuthor(authorId: number): void {
        this.router.navigate(["authors", authorId]);
    }
}
