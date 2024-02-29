import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { Category } from "../../interfaces/category";
import { CategoriesDataService } from "../../services/categories.service";
import { NavBarComponent } from "../User/nav-bar/nav-bar.component";

@Component({
    selector: "app-categories",
    standalone: true,
    imports: [NavBarComponent],
    templateUrl: "./categories.component.html",
    styleUrl: "./categories.component.css"
})
export class CategoriesComponent {
    categories: Array<Category> = [];

    constructor(private dataService: CategoriesDataService, private router: Router) {}

    ngOnInit(): void {
        this.dataService.getCategories().subscribe((data) => {
            this.categories = data;
        });
    }

    viewCategory(categoryId: number): void {
        this.router.navigate(["/categories", categoryId]);
    }
}
