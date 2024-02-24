import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { AppComponent } from '../../app.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../services/category.service';
import { Category } from '../interfaces/category';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,NgbModule,ReactiveFormsModule],

  
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.css'
})
export class AdminCategoriesComponent implements OnInit {
  categories: any[] = [];
  newCategoryName: string = ''; 
  selectedCategory: any = {};
  newCategoryValidationMessage: string = '';
  updateCategoryValidationMessage: string = '';

   // Added to store the selected category for update


  @ViewChild('addCategoryModal') addCategoryModal: any;
  @ViewChild('updateCategoryModal') updateCategoryModal: any;

  constructor(private modalService: NgbModal, private categoriesService: CategoryService ,    private formBuilder: FormBuilder
    ) {
    }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoriesService.getCategories().subscribe(
      (      categories: any[]) => {
        this.categories = categories;
      },
      (      error: any) => {
        console.error('Error loading categories:', error);
      }
    );
  }
  // totalItems: number = 0;
  // totalCategories: number = 0;
  // currentPage = 1;
  // pageSize = 10;
  // loadCategories(): void {
  //   this.categoriesService.getCategories().subscribe(
  //     (categories: any[]) => {
  //       this.totalCategories = categories.length; // Update the total number of categories
  //       this.categories = categories;
  //     },
  //     (error: any) => {
  //       console.error('Error loading categories:', error);
  //     }
  //   );
  // }

  // changePage(newPage: number): void {
  //   if (newPage >= 1 && newPage <= this.totalCategories) {
  //     this.currentPage = newPage;
  //     this.loadCategories();
  //   }
  // }

  // getPages(): number[] {
  //   const totalPages = Math.ceil(this.categories.length / this.pageSize);
  //   return Array.from({ length: totalPages }, (_, i) => i + 1);
  // }

  openAddCategoryModal(): void {
    this.newCategoryName = ''; // Reset the new category name
    this.modalService.open(this.addCategoryModal, { centered: true });
  }

  // admin-categories.component.ts
// saveCategory(): void {
//   const newCategory = { name: this.newCategoryName };
//   this.categoriesService.addCategory(newCategory).subscribe(
//     response => {
//       console.log('Category saved successfully:', response);
//       this.loadCategories(); // Refresh the category list after adding
//       this.modalService.dismissAll(); // Close the modal
//     },
//     error => {
//       console.error('Error saving category:', error);
//     }
//   );
// }
// saveCategory(): void {
//   if (this.newCategoryName.trim() !== '') {
//     const newCategory = { name: this.newCategoryName };
//     this.categoriesService.addCategory(newCategory).subscribe(
//       (response) => {
//         console.log('Category saved successfully:', response);
//         this.loadCategories();
//         this.modalService.dismissAll();
//       },
//       (error) => {
//         console.error('Error saving category:', error);
//       }
//     );
//   } else {
//     this.newCategoryValidationMessage = 'Category Name is required.';
//   }
// }

saveCategory(): void {
  if (this.newCategoryName.trim() !== '') {
    // Check if the category name contains only letters
    if (/^[a-zA-Z]+$/.test(this.newCategoryName)) {
      const newCategory = { name: this.newCategoryName };
      this.categoriesService.addCategory(newCategory).subscribe(
        (response) => {
          console.log('Category saved successfully:', response);
          this.loadCategories();
          this.modalService.dismissAll();
        },
        (error) => {
          console.error('Error saving category:', error);
        }
      );
    } else {
      this.newCategoryValidationMessage = 'Category Name should only contain letters.';
    }
  } else {
    this.newCategoryValidationMessage = 'Category Name is required.';
  }
}


  openUpdateCategoryModal(content: any, category: any): void {
    this.selectedCategory = { ...category }; // Clone the selected category to avoid modifying the original
    this.modalService.open(content, { centered: true });
  }

  // updateCategory(): void {
  //   this.categoriesService.updateCategory(this.selectedCategory).subscribe(
  //     (      response: any) => {
  //       console.log('Category updated successfully:', response);
  //       this.loadCategories(); // Refresh the category list after updating
  //       this.modalService.dismissAll(); // Close the modal
  //     },
  //     (      error: any) => {
  //       console.error('Error updating category:', error);
  //     }
  //   );
  // }
  // updateCategory(): void {
  //   if (this.selectedCategory.name.trim() !== '') {
  //     if (/^[a-zA-Z]+$/.test(this.selectedCategory)) {

  //     this.categoriesService.updateCategory(this.selectedCategory).subscribe(
  //       (response: any) => {
  //         console.log('Category updated successfully:', response);
  //         this.loadCategories();
  //         this.modalService.dismissAll();
  //       },
  //       (error: any) => {
  //         console.error('Error updating category:', error);
  //       }
  //     );
  //   } else {
  //     this.updateCategoryValidationMessage = 'Updated Category Name is required.';
  //   }
  // }}
  updateCategory(): void {
    if (this.selectedCategory.name.trim() !== '' ) {
      // Check if the updated category name contains only letters
      if (/^[a-zA-Z]+$/.test(this.selectedCategory.name)) {
        this.categoriesService.updateCategory(this.selectedCategory).subscribe(
          (response: any) => {
            console.log('Category updated successfully:', response);
            this.loadCategories();
            this.modalService.dismissAll();
          },
          (error: any) => {
            console.error('Error updating category:', error);
          }
        );
      } else {
        this.updateCategoryValidationMessage = 'Updated Category Name should only contain letters.';
      }
    } else {
      this.updateCategoryValidationMessage = 'Updated Category Name is required.';
    }
  }
  
  deleteCategory(categoryId: number): void {
    this.categoriesService.deleteCategory(categoryId).subscribe(
      (      response: any) => {
        console.log('Category deleted successfully:', response);
        this.loadCategories(); // Refresh the category list after deleting
      },
      (      error: any) => {
        console.error('Error deleting category:', error);
      }
    );
  }
}