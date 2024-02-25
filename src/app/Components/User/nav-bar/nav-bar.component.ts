import { Component } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: "app-nav-bar",
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: "./nav-bar.component.html",
    styleUrl: "./nav-bar.component.css"
})
export class NavBarComponent {
    constructor(private _Router:Router) {

  }
signOut():void{
  localStorage.removeItem('token')
  this._Router.navigate(['/'])
}
}
