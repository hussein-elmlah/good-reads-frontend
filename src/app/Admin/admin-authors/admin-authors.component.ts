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
  newAuthor: Author = { fisrtname: '', lastname:"",DOB: new Date(), Books: '' };
  selectedAuthor: Author = {
    fisrtname: '',
    DOB: new Date(),
    Books: '',
    lastname:''
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
    this.newAuthor = { fisrtname: '', DOB: new Date(), Books: '' ,lastname:''};
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
    if (this.selectedAuthor.fisrtname.trim() !== ''&&this.selectedAuthor.lastname.trim() !== '' && this.selectedAuthor.DOB !== null) {
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
  

deleteAuthor(authorId: number): void {
  this.authorService.deleteAuthor(authorId).subscribe(
    (response: any) => {
      console.log('Author deleted successfully:', response);
      this.loadAuthors(); 
    },
    (error: any) => {
      console.error('Error deleting author:', error);
    }
  );
}

  
  
  
  

  handleImageUpload(event: any): void {
    const file = event.target.files[0];
    this.uploadImage(file, (url: string) => {
      this.newAuthor.image = url;
    });
  }

  handleUpdatedImageUpload(event: any): void {
    const file = event.target.files[0];
    this.uploadImage(file, (url: string) => {
      this.selectedAuthor.image = url;
    });
  }

  private uploadImage(file: File, callback: (url: string) => void): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const imageUrl = e.target.result;
    
      callback(imageUrl);
    };
    reader.readAsDataURL(file);
  }
}