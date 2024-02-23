import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Author } from '../interfaces/author';
import { AuthorService } from '../services/author.service';

@Component({
  selector: 'app-admin-authors',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,NgbModule,ReactiveFormsModule],

  templateUrl: './admin-authors.component.html',
  styleUrl: './admin-authors.component.css'
})
export class AdminAuthorsComponent implements OnInit {
  authors: Author[] = [];
  newAuthor: Author = { fullName: '', DOB: new Date(), Books: '' };
  selectedAuthor: Author = {
    fullName: '',
    DOB: new Date(),
    Books: ''
  };
  newAuthorValidationMessage: string = '';
  updateAuthorValidationMessage: string = '';

  @ViewChild('addAuthorModal') addAuthorModal: any;

  constructor(private modalService: NgbModal, private authorService: AuthorService) {}

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors(): void {
    this.authorService.getAuthors().subscribe(
      (authors: Author[]) => {
        this.authors = authors;
      },
      (error: any) => {
        console.error('Error loading authors:', error);
      }
    );
  }

  openAddAuthorModal(): void {
    this.newAuthor = { fullName: '', DOB: new Date(), Books: '' };
    this.modalService.open(this.addAuthorModal, { centered: true });
  }

  saveAuthor(): void {
    this.authorService.addAuthor(this.newAuthor).subscribe(
      response => {
        console.log('Author saved successfully:', response);
        this.loadAuthors();
        this.modalService.dismissAll();
      },
      error => {
        console.error('Error saving author:', error);
        this.newAuthorValidationMessage = 'Error saving author. Please try again.';
      }
    );
  }

  openUpdateAuthorModal(content: any, author: Author): void {
    this.selectedAuthor = { ...author };
    this.modalService.open(content, { centered: true });
  }

  updateAuthor(): void {
    if (this.selectedAuthor.fullName.trim() !== '' && this.selectedAuthor.DOB !== null) {
      this.authorService.updateAuthor(this.selectedAuthor).subscribe(
        (response: any) => {
          console.log('Author updated successfully:', response);
          this.loadAuthors();
          this.modalService.dismissAll();
        },
        (error: any) => {
          console.error('Error updating author:', error);
        }
      );
    } else {
      this.updateAuthorValidationMessage = 'Updated Full Name and Date of Birth are required.';
    }
  }
  
  // admin-authors.component.ts

deleteAuthor(authorId: number): void {
  this.authorService.deleteAuthor(authorId).subscribe(
    (response: any) => {
      console.log('Author deleted successfully:', response);
      this.loadAuthors(); // Refresh the author list after deleting
    },
    (error: any) => {
      console.error('Error deleting author:', error);
    }
  );
}

  
  
  
  

  // Handle image upload for adding author
  handleImageUpload(event: any): void {
    const file = event.target.files[0];
    this.uploadImage(file, (url: string) => {
      this.newAuthor.image = url;
    });
  }

  // Handle image upload for updating author
  handleUpdatedImageUpload(event: any): void {
    const file = event.target.files[0];
    this.uploadImage(file, (url: string) => {
      this.selectedAuthor.image = url;
    });
  }

  // Simulate image upload to a server and get the image URL
  private uploadImage(file: File, callback: (url: string) => void): void {
    // Simulate upload logic here, for example, using FileReader to read the file
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const imageUrl = e.target.result;
      // In a real-world scenario, you would send the file to the server and get the URL
      // Here, we'll just simulate it by providing a base64 representation of the image
      callback(imageUrl);
    };
    reader.readAsDataURL(file);
  }
}