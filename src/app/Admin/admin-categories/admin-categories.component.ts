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
  newCategoryName: string = ''; // Added to store the new category name
  selectedCategory: any = {}; // Added to store the selected category for update

  @ViewChild('addCategoryModal') addCategoryModal: any;

  constructor(private modalService: NgbModal, private categoriesService: CategoryService) {}

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

  openAddCategoryModal(): void {
    this.newCategoryName = ''; // Reset the new category name
    this.modalService.open(this.addCategoryModal, { centered: true });
  }

  // admin-categories.component.ts
saveCategory(): void {
  const newCategory = { name: this.newCategoryName };
  this.categoriesService.addCategory(newCategory).subscribe(
    response => {
      console.log('Category saved successfully:', response);
      this.loadCategories(); // Refresh the category list after adding
      this.modalService.dismissAll(); // Close the modal
    },
    error => {
      console.error('Error saving category:', error);
    }
  );
}


  openUpdateCategoryModal(content: any, category: any): void {
    this.selectedCategory = { ...category }; // Clone the selected category to avoid modifying the original
    this.modalService.open(content, { centered: true });
  }

  updateCategory(): void {
    this.categoriesService.updateCategory(this.selectedCategory).subscribe(
      (      response: any) => {
        console.log('Category updated successfully:', response);
        this.loadCategories(); // Refresh the category list after updating
        this.modalService.dismissAll(); // Close the modal
      },
      (      error: any) => {
        console.error('Error updating category:', error);
      }
    );
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