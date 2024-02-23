import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-books-details',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './books-details.component.html',
  styleUrl: './books-details.component.css'
})
export class BooksDetailsComponent {

}
