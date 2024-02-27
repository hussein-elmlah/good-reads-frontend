// import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import {
    Component, OnInit
} from "@angular/core";
import {
    FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";

import { AuthService } from "../../services/auth.service";

@Component({
    selector: "app-admin-login",
    standalone: true,
    imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
    templateUrl: "./admin-login.component.html",
    styleUrl: "./admin-login.component.css"
})
export class AdminloginComponent implements OnInit {
    loginForm!: FormGroup;
    loginError: string | null = null;
    formSubmitted = false;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.loginForm = this.formBuilder.group({
            username: ["", [Validators.required, Validators.minLength(3)]],
            password: ["", [Validators.required]],
        });
    }

    onSubmit() {
        this.formSubmitted = true;
        if (this.loginForm.valid) {
            const { username, password } = this.loginForm.value;
            this.authService.login(username, password).subscribe(
                (success: any) => {
                    if (success) {
                        this.router.navigate(["/adminProfile"]);
                    } else {
                        this.loginError = "Invalid username or password";
                    }
                },
                (error: any) => {
                    console.error(error);
                }
            );
        } else {
            this.loginError = null;
        }
    }

    hasError(controlName: string): boolean {
        const control = this.loginForm.get(controlName);

        return !!control?.hasError("invalid") && (control?.touched || this.formSubmitted);
    }
}
