import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-authors-details',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './authors-details.component.html',
  styleUrl: './authors-details.component.css'
})
export class AuthorsDetailsComponent {

}
