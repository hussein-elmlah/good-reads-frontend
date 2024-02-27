import { CommonModule } from "@angular/common";
import {
    Component, OnInit, ViewChild
} from "@angular/core";
import {
    FormBuilder, FormsModule, ReactiveFormsModule
} from "@angular/forms";
import { RouterLink } from "@angular/router";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";

// import { AppComponent } from '../../app.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from "../../services/category.service";

@Component({
    selector: "app-admin-categories",
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, NgbModule, ReactiveFormsModule],

    templateUrl: "./admin-categories.component.html",
    styleUrl: "./admin-categories.component.css"
})
export class AdminCategoriesComponent implements OnInit {
    categories: any[] = [];
    newCategoryName: string = "";
    selectedCategory: any = {};
    
    newCategoryValidationMessage: string = "";
    updateCategoryValidationMessage: string = "";


    

    // Added to store the selected category for update

    @ViewChild("addCategoryModal") addCategoryModal: any;
    @ViewChild("updateCategoryModal") updateCategoryModal: any;

    constructor(private modalService: NgbModal, private categoriesService: CategoryService, private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.loadCategories();
    }

   

    loadCategories(): void {
        this.categoriesService.getCategories().subscribe(
          (categories: any[]) => {
            this.categories = categories;
          },
          (error: any) => {
            console.error("Error loading categories:", error);
          }
        );
      }
    
    openAddCategoryModal(): void {
        this.newCategoryName = ""; // Reset the new category name
        this.modalService.open(this.addCategoryModal, { centered: true });
    }

   

   
      
    saveCategory(): void {
        if (this.newCategoryName.trim() !== "") {
          // Check if the category name contains only letters
          if (/^[a-zA-Z]+$/.test(this.newCategoryName)) {
            const newCategory = { name: this.newCategoryName };
      
            this.categoriesService.addCategory(newCategory).subscribe(
              (response) => {
                console.log("Category saved successfully:", response);
                this.loadCategories();
                this.modalService.dismissAll();
              },
              (error) => {
                if (error.status === 409) {
                  // Category name already exists
                  this.newCategoryValidationMessage = "Category Name already exists.";
                } else {
                  console.error("Error saving category:", error);
                  this.newCategoryValidationMessage = "Internal Server Error";
                }
              }
            );
          } else {
            this.newCategoryValidationMessage = "Category Name should only contain letters.";
          }
        } else {
          this.newCategoryValidationMessage = "Category Name is required.";
        }
      }

   
   
    


   

    
    openUpdateCategoryModal(content: any, categoryId: number): void {
        console.log("Category ID:", categoryId); // Log to check the value
        this.selectedCategory = { _id: categoryId }; 
        this.modalService.open(content, { centered: true });
    }
    
    
    updateCategory(): void {
        console.log('Updating category with ID:', this.selectedCategory._id);
    
        if (this.selectedCategory.name.trim() !== "") {
            // Check if the updated category name contains only letters
            if (/^[a-zA-Z]+$/.test(this.selectedCategory.name)) {
                this.categoriesService.updateCategory(this.selectedCategory._id, this.selectedCategory.name).subscribe(
                    (response: any) => {
                        console.log("Category updated successfully:", response);
                        this.loadCategories();
                        this.modalService.dismissAll();
                    },
                    (error: any) => {
                        console.error("Error updating category:", error);
                    }
                );
            } else {
                this.updateCategoryValidationMessage = "Updated Category Name should only contain letters.";
            }
        } else {
            this.updateCategoryValidationMessage = "Updated Category Name is required.";
        }
    }
    

      
    deleteCategory(categoryId: number): void {
        this.categoriesService.deleteCategory(categoryId).subscribe(
          (response: any) => {
            console.log("Category deleted successfully:", response);
            this.loadCategories(); // Refresh the category list after deleting
            this.modalService.dismissAll(); // Close the modal
          },
          (error: any) => {
            console.error("Error deleting category:", error);
          }
        );
      }
  
      
}
