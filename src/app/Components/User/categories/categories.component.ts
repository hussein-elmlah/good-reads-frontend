import { Component } from "@angular/core";

import { CategoriesDataService } from "../../../services/categories.service";
import { Category } from "../interfaces/category.model";
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
    selector: "app-categories",
    standalone: true,
    imports: [NavBarComponent],
    templateUrl: "./categories.component.html",
    styleUrl: "./categories.component.css"
})
export class CategoriesComponent {
    categories?: Array<Category>;

    constructor(private dataService: CategoriesDataService) {
    //     this.categories = ["Economics", "Fiction", "Adventure", "Science", "Sci-Fi", "Action", "Thriller", "Horror"];
    }

    ngOnInit() {
        this.dataService.getCategories().subscribe((data) => {
            this.categories = data;
        });
    }
}
