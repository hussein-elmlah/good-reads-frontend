import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';


@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent {

}
