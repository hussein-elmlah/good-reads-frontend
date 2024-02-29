import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import {
    FormBuilder, FormGroup, ReactiveFormsModule, Validators
} from "@angular/forms";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

import { AuthService } from "../../../services/auth.service";
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
    selector: "app-register",
    standalone: true,
    imports: [NavBarComponent, RouterLink, ReactiveFormsModule, RouterLinkActive, CommonModule, HttpClientModule],
    templateUrl: "./register.component.html",
    styleUrl: "./register.component.css"
})
export class RegisterComponent {
    selectedImage: File | null = null;
    registerForm: FormGroup;
    errMsg: string = "";
    isLoading: boolean = false;

    constructor(private authService: AuthService, private fb: FormBuilder, private http: HttpClient, private _Router: Router) {
        this.registerForm = this.fb.group({
            firstName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z]+$/)]],
            lastName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z]+$/)]],
            username: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z0-9_.-]+$/)]],
            image: [null, [Validators.required]],
            email: ["", [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
            password: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{8,30}$/)]],
            rePassword: [""]
        }, { validators: [this.confirmPassword] });
    }

    confirmPassword(group: FormGroup): void {
        const password = group.get("password");
        const repassword = group.get("rePassword");

        if (repassword?.value == "") {
            repassword?.setErrors({ required: true });
        } else if (password?.value != repassword?.value) {
            repassword?.setErrors({ mismatch: true });
        }
    }

    handleFileInput(event: any): void {
        const { files } = event.target;
        if (files && files.length > 0) {
            this.selectedImage = files[0];
        }
    }

    handleForm(): void {
        this.isLoading = true;
        const formData = new FormData();
        formData.append("image", this.selectedImage!); // Append selected image file

        // Append other form fields
        Object.keys(this.registerForm.value).forEach((key) => {
            if (key !== "image") {
                formData.append(key, this.registerForm.value[key]);
            }
        });

        if (this.registerForm.valid) {
            this.authService.register(formData).subscribe({
                next: (response: any) => {
                    console.log(response);
                    if (response.token) {
                        this.isLoading = false;
                        // Redirect to login page after successful registration
                        // You might want to handle this differently based on your application flow
                        this._Router.navigate(["/login"]);
                    }
                },
                error: (err: any) => {
                    console.log(err);
                    this.errMsg = err.error.message;
                    this.isLoading = false;
                }
            });
        }
    }
}
