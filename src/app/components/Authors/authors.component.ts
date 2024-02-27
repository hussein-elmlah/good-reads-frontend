import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";

import { PaginationComponent } from "../pagination/pagination.component";
import { Author } from "../../interfaces/author.model";
import { NavBarComponent } from "../User/nav-bar/nav-bar.component";

@Component({
    selector: "app-authors",
    standalone: true,
    imports: [CommonModule, PaginationComponent, NavBarComponent],
    styleUrls: ["./authors.component.css"],
    templateUrl: "./authors.component.html",
    providers: [HttpClient] // Add HttpClient to the providers array
})
export class AuthorsComponent {
    authors: Author[] = [];
    currentPage: number = 1;
    itemsPerPage: number = 8;

    constructor(private http: HttpClient, private router: Router) { } // Inject HttpClient

    ngOnInit(): void {
        this.fetchAuthors();
    }

    fetchAuthors() {
        this.getAuthors().subscribe((data: Author[]) => {
            this.authors = data;
        });
    }

    getAuthors() {
    return this.http.get<Author[]>('http://localhost:3000/authors/');
        // return this.dummyData();
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

    // Method to generate dummy data (for demonstration)
    // dummyData(): Observable<Author[]> {
    //     return of([
    //         {
    //             id: 1, firstName: "Ahmed", lastName: "Ali", dob: "1987-03-15", photo: "https://randomuser.me/api/portraits/men/1.jpg"
    //         },
    //         {
    //             id: 2, firstName: "Mohammed", lastName: "Hassan", dob: "1990-05-20", photo: "https://randomuser.me/api/portraits/men/2.jpg"
    //         },
    //         {
    //             id: 3, firstName: "Youssef", lastName: "Mahmoud", dob: "1982-12-10", photo: "https://randomuser.me/api/portraits/men/3.jpg"
    //         },
    //         {
    //             id: 4, firstName: "Omar", lastName: "Said", dob: "1975-08-25", photo: "https://randomuser.me/api/portraits/men/4.jpg"
    //         },
    //         {
    //             id: 5, firstName: "Abdullah", lastName: "Khalid", dob: "1989-02-18", photo: "https://randomuser.me/api/portraits/men/5.jpg"
    //         },
    //         {
    //             id: 6, firstName: "Khalil", lastName: "Abdul", dob: "1980-07-05", photo: "https://randomuser.me/api/portraits/men/6.jpg"
    //         },
    //         {
    //             id: 7, firstName: "Ali", lastName: "Ahmed", dob: "1978-11-30", photo: "https://randomuser.me/api/portraits/men/7.jpg"
    //         },
    //         {
    //             id: 8, firstName: "Mustafa", lastName: "Ibrahim", dob: "1984-09-22", photo: "https://randomuser.me/api/portraits/men/8.jpg"
    //         },
    //         {
    //             id: 9, firstName: "Hussein", lastName: "Yousef", dob: "1986-04-17", photo: "https://randomuser.me/api/portraits/men/9.jpg"
    //         },
    //         {
    //             id: 10, firstName: "Sami", lastName: "Nasser", dob: "1992-06-12", photo: "https://randomuser.me/api/portraits/men/10.jpg"
    //         },
    //         {
    //             id: 11, firstName: "Ahmad", lastName: "Fahad", dob: "1973-10-08", photo: "https://randomuser.me/api/portraits/men/11.jpg"
    //         },
    //         {
    //             id: 12, firstName: "Adel", lastName: "Hadi", dob: "1988-01-25", photo: "https://randomuser.me/api/portraits/men/12.jpg"
    //         },
    //         {
    //             id: 1, firstName: "Ahmed", lastName: "Ali", dob: "1987-03-15", photo: "https://randomuser.me/api/portraits/men/1.jpg"
    //         },
    //         {
    //             id: 2, firstName: "Mohammed", lastName: "Hassan", dob: "1990-05-20", photo: "https://randomuser.me/api/portraits/men/2.jpg"
    //         },
    //         {
    //             id: 3, firstName: "Youssef", lastName: "Mahmoud", dob: "1982-12-10", photo: "https://randomuser.me/api/portraits/men/3.jpg"
    //         },
    //         {
    //             id: 4, firstName: "Omar", lastName: "Said", dob: "1975-08-25", photo: "https://randomuser.me/api/portraits/men/4.jpg"
    //         },
    //         {
    //             id: 5, firstName: "Abdullah", lastName: "Khalid", dob: "1989-02-18", photo: "https://randomuser.me/api/portraits/men/5.jpg"
    //         },
    //         {
    //             id: 6, firstName: "Khalil", lastName: "Abdul", dob: "1980-07-05", photo: "https://randomuser.me/api/portraits/men/6.jpg"
    //         },
    //         {
    //             id: 7, firstName: "Ali", lastName: "Ahmed", dob: "1978-11-30", photo: "https://randomuser.me/api/portraits/men/7.jpg"
    //         },
    //         {
    //             id: 8, firstName: "Mustafa", lastName: "Ibrahim", dob: "1984-09-22", photo: "https://randomuser.me/api/portraits/men/8.jpg"
    //         },
    //         {
    //             id: 4, firstName: "Omar", lastName: "Said", dob: "1975-08-25", photo: "https://randomuser.me/api/portraits/men/4.jpg"
    //         },
    //         {
    //             id: 5, firstName: "Abdullah", lastName: "Khalid", dob: "1989-02-18", photo: "https://randomuser.me/api/portraits/men/5.jpg"
    //         },
    //         {
    //             id: 6, firstName: "Khalil", lastName: "Abdul", dob: "1980-07-05", photo: "https://randomuser.me/api/portraits/men/6.jpg"
    //         },
    //         {
    //             id: 7, firstName: "Ali", lastName: "Ahmed", dob: "1978-11-30", photo: "https://randomuser.me/api/portraits/men/7.jpg"
    //         },
    //         {
    //             id: 8, firstName: "Mustafa", lastName: "Ibrahim", dob: "1984-09-22", photo: "https://randomuser.me/api/portraits/men/8.jpg"
    //         },
    //         {
    //             id: 9, firstName: "Hussein", lastName: "Yousef", dob: "1986-04-17", photo: "https://randomuser.me/api/portraits/men/9.jpg"
    //         },
    //         {
    //             id: 10, firstName: "Sami", lastName: "Nasser", dob: "1992-06-12", photo: "https://randomuser.me/api/portraits/men/10.jpg"
    //         },
    //         {
    //             id: 11, firstName: "Ahmad", lastName: "Fahad", dob: "1973-10-08", photo: "https://randomuser.me/api/portraits/men/11.jpg"
    //         },
    //         {
    //             id: 12, firstName: "Adel", lastName: "Hadi", dob: "1988-01-25", photo: "https://randomuser.me/api/portraits/men/12.jpg"
    //         },
    //     ]);
    // }
}
