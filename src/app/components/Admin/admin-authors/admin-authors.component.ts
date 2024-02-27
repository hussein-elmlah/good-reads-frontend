import { CommonModule } from "@angular/common";
import {
    Component, OnInit, ViewChild
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { Author } from "../../../interfaces/author";
import { AuthorService } from "../../services/author.service";

@Component({
    selector: "app-admin-authors",
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, NgbModule, ReactiveFormsModule],

    templateUrl: "./admin-authors.component.html",
    styleUrl: "./admin-authors.component.css"
})
export class AdminAuthorsComponent implements OnInit {
    authors: Author[] = [];
    newAuthor: Author = {
        firstName: "", lastName: "", dob: null, books: ""
    };
    selectedAuthor: Author = {
        firstName: "",
        dob: "",
        books: "",
        lastName: ""
    };
    newAuthorValidationMessage: string = "";
    updateAuthorValidationMessage: string = "";

    @ViewChild("addAuthorModal") addAuthorModal: any;

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
                console.error("Error loading authors:", error);
            }
        );
    }

    openAddAuthorModal(): void {
        this.newAuthor = {
            firstName: "", dob: "", books: "", lastName: ""
        };
        this.modalService.open(this.addAuthorModal, { centered: true });
    }
    // saveAuthor(): void {
    //   if (
    //     this.newAuthor.fisrtname.trim() !== '' &&
    //     this.newAuthor.lastname.trim() !== '' &&
    //     this.newAuthor.Books.trim() !== '' &&
    //     // this.newAuthor.DOB !== null
    //     (this.newAuthor.DOB?.toString().trim() !== null && this.newAuthor.DOB?.toString().trim() !== '')

    //   ) {
    //     this.authorService.addAuthor(this.newAuthor).subscribe(
    //       response => {
    //         console.log('Author saved successfully:', response);
    //         this.loadAuthors();
    //         this.modalService.dismissAll();
    //       },
    //       error => {
    //         console.error('Error saving author:', error);
    //         this.newAuthorValidationMessage = 'Error saving author. Please try again.';
    //       }
    //     );
    //   } else {
    //     // Set validation message if any of the required fields are empty
    //     this.newAuthorValidationMessage = 'Please fill in all the required fields.';
    //   }
    // }

    saveAuthor(): void {
    // if (
    //   this.newAuthor.fisrtname.trim() !== '' &&
    //   this.newAuthor.lastname.trim() !== '' &&
    //   this.newAuthor.Books.trim() !== '' &&
    //   this.newAuthor.DOB !== null && this.newAuthor.DOB.trim() !== ''
    // )
        if (
            this.isNameValid(this.newAuthor.firstName)
      && this.isNameValid(this.newAuthor.lastName)
      && this.newAuthor.books.trim() !== ""
      && this.newAuthor.dob !== null && this.newAuthor.dob.trim() !== ""
        ) {
            this.authorService.addAuthor(this.newAuthor).subscribe(
                (response) => {
                    console.log("Author saved successfully:", response);
                    this.loadAuthors();
                    this.modalService.dismissAll();
                },
                (error) => {
                    console.error("Error saving author:", error);
                    this.newAuthorValidationMessage = "Error saving author. Please try again.";
                }
            );
        } else {
            // Handle the case where the date is not a valid Date object
            // this.newAuthorValidationMessage = 'Please select a valid Date of Birth.';
            this.newAuthorValidationMessage = "Please fill in all the required fields with valid names.";
        }
    }

    public formattedDOB: string = "";

    // openUpdateAuthorModal(content: any, author: Author): void {
    //   this.selectedAuthor = { ...author };
    //   this.formattedDOB = this.selectedAuthor.DOB ? new Date(this.selectedAuthor.DOB).toISOString().split('T')[0] : '';
    //   this.modalService.open(content, { centered: true });
    // }

    updateAuthor(): void {
        // this.selectedAuthor.DOB = this.formattedDOB ? new Date(this.formattedDOB) : new Date();

        // if (this.selectedAuthor.fisrtname.trim() !== ''&&this.selectedAuthor.lastname.trim() !== '' && this.selectedAuthor.DOB !== null)
        // if (
        //   this.selectedAuthor.fisrtname.trim() !== '' &&
        //   this.selectedAuthor.lastname.trim() !== '' &&
        //   this.selectedAuthor.Books != null && // Check for null or undefined
        //   this.selectedAuthor.Books.trim() !== '' &&
        //   this.selectedAuthor.DOB !== null && this.selectedAuthor.DOB.trim() !== ''
        // )
        if (
            this.isNameValid(this.selectedAuthor.firstName)
        && this.isNameValid(this.selectedAuthor.lastName)
        && this.selectedAuthor.books != null
        && this.selectedAuthor.books.trim() !== ""
        && this.selectedAuthor.dob !== null && this.selectedAuthor.dob.trim() !== ""
        ) {
            this.authorService.updateAuthor(this.selectedAuthor).subscribe(
                (response: any) => {
                    console.log("Author updated successfully:", response);
                    this.loadAuthors();
                    this.modalService.dismissAll();
                },
                (error: any) => {
                    console.error("Error updating author:", error);
                }
            );
        } else {
        // this.updateAuthorValidationMessage = 'Updated Full Name, Books, and Date of Birth are required.';
            this.updateAuthorValidationMessage = "Updated First Name, Last Name, Books, and Date of Birth are required with no speacial characters .";
        }
    }

    // saveAuthor(): void {
    //   this.authorService.addAuthor(this.newAuthor).subscribe(
    //     response => {
    //       console.log('Author saved successfully:', response);
    //       this.loadAuthors();
    //       this.modalService.dismissAll();
    //     },
    //     error => {
    //       console.error('Error saving author:', error);
    //       this.newAuthorValidationMessage = 'Error saving author. Please try again.';
    //     }
    //   );
    // }

    // saveAuthor(): void {
    //   if (
    //     this.newAuthor.fisrtname.trim() !== '' &&
    //     this.newAuthor.lastname.trim() !== '' &&
    //     this.newAuthor.Books.trim() !== '' &&
    //     this.newAuthor.DOB !== null
    //   ) {
    //     this.authorService.addAuthor(this.newAuthor).subscribe(
    //       response => {
    //         console.log('Author saved successfully:', response);
    //         this.loadAuthors();
    //         this.modalService.dismissAll();
    //       },
    //       error => {
    //         console.error('Error saving author:', error);
    //         this.newAuthorValidationMessage = 'Error saving author. Please try again.';
    //       }
    //     );
    //   } else {
    //     // Set validation message if any of the required fields are empty
    //     this.newAuthorValidationMessage = 'Please fill in all the required fields.';
    //   }
    // }

    // public formattedDOB: string = '';

    openUpdateAuthorModal(content: any, author: Author): void {
        this.selectedAuthor = { ...author };
        this.formattedDOB = this.selectedAuthor.dob ? new Date(this.selectedAuthor.dob).toISOString().split("T")[0] : "";
        this.modalService.open(content, { centered: true });
    }

    deleteAuthor(authorId: number): void {
        this.authorService.deleteAuthor(authorId).subscribe(
            (response: any) => {
                console.log("Author deleted successfully:", response);
                this.loadAuthors();
            },
            (error: any) => {
                console.error("Error deleting author:", error);
            }
        );
    }

    handleImageUpload(event: any): void {
        const file = event.target.files[0];
        this.uploadImage(file, (url: string) => {
            this.newAuthor.photo = url;
        });
    }

    handleUpdatedImageUpload(event: any): void {
        const file = event.target.files[0];
        this.uploadImage(file, (url: string) => {
            this.selectedAuthor.photo = url;
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

    private isNameValid(name: string): boolean {
    // Check if the name contains only letters
        return /^[a-zA-Z]+$/.test(name);
    }
}