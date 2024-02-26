import { Component } from '@angular/core';
import { AuthorsComponent } from '../authors/authors.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorsService } from '../../../Services/authors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './authors-details.component.html',
  styleUrls: ['./authors-details.component.css']
})
export class AuthorsDetailsComponent {
  id:any ;
  author:any ;
  constructor(private authorsServ:AuthorsService, private _activateRoute:ActivatedRoute, private _router:Router){
    this.id = this._activateRoute.snapshot.params['id']
    this.fetchData()
  }

  fetchData(){
    this.authorsServ.getAuthorById(this.id).subscribe(
      data => {

        this.author = data
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          this._router.navigate(['/not-found'])
        }
      }
      )

  }
}