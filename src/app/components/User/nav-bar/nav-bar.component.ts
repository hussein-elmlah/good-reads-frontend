import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BookService } from '../../../Services/book.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  searchQuery: string = "";
  searchResults: any[] = [];

  constructor(private _Router: Router, private _bookService: BookService, private _auth: AuthService) { }

  SearchBooks(): void {
    if (this.searchQuery.trim() !== "") {
      this._bookService.SearchBooks(this.searchQuery).subscribe((data: any) => {
        this.searchResults = data;
        console.log(data);
      });
    } else {
      this.searchResults = [];
    }
  }
 

  signOut(): void {
    localStorage.removeItem('token');
    this._Router.navigate(['/']);
  }
}
