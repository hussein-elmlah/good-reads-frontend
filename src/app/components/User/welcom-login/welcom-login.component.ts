import { CommonModule, } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { BookService } from "../../../Services/book.service";;
import { LoginComponent } from "../login/login.component";
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { RegisterComponent } from "../register/register.component";

@Component({
    selector: "app-welcom-login",
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, RouterLinkActive, CommonModule, LoginComponent, RegisterComponent, NavBarComponent, HttpClientModule],
    templateUrl: "./welcom-login.component.html",
    styleUrl: "./welcom-login.component.css"
})
export class WelcomLoginComponent implements OnInit {
    constructor(private _BookService:BookService) {}
    books:any[] = [];
authors: any[] = []; 

    ngOnInit(): void {
      this._BookService.getAllBooks().subscribe({
        next: (response) => {
          console.log("Response:", response);
          if (response && Array.isArray(response)) {
            console.log("Books:", response);
            
            // Calculate average rating for each book
            const booksWithAvgRating = response.map(book => {
              // Check if 'reviews' array exists and is not empty
              const totalRating = book.reviews && book.reviews.length > 0
                ? book.reviews.reduce((acc: number, curr: { rate: number }) => acc + curr.rate, 0)
                : 0;
              const avgRating = book.reviews && book.reviews.length > 0
                ? totalRating / book.reviews.length
                : 0;
              
              // Return the modified book object with avgRating added
              return { ...book, avgRating };
            });
            
            // Sort books by avgRating in descending order
            this.books = booksWithAvgRating.sort((a, b) => b.avgRating - a.avgRating);
            
            // Get the top 6 highest-rated books
            this.books = this.books.slice(0, 6);
            
            console.log('Sorted Books:', this.books);
          } else {
            console.error('Invalid response or missing books array.');
          }
        },
        error: (error) => {
          console.error('Error fetching books:', error);
        }
      });   
        };
    
    showLogin: boolean = false;
    showRegister: boolean = false;
}
