import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import {
    FormBuilder, FormControlOptions, FormGroup, ReactiveFormsModule, Validators
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
    FormBuilder: any;
    selectedImage: File | null = null;
    constructor(private _AuthService:AuthService, private _Router:Router, private _FormBuilder:FormBuilder) {}
    errMsg:string = "";
    isLoading:boolean = false;

    registerForm:FormGroup = this._FormBuilder.group({
        firstName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        lastName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        username: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        image: ["", []],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{8,30}$/)]],
        rePassword: [""]
    }, { validators: [this.confirmPassword] } as FormControlOptions);

    confirmPassword(group:FormGroup):void {
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

    handleForm():void {
        this.isLoading = true;
        const userData = this.registerForm.value;
        if (this.registerForm.valid === true) {
            this._AuthService.register(userData).subscribe({
                next: (response) => {
                    console.log(response);
                    if (response.token) {
                        this.isLoading = false;
                        this._Router.navigate(["/login"]);
                    }
                },
                error: (err) => {
                    console.log(err);
                    this.errMsg = err.error.message;
                    this.isLoading = false;
                }
            });
        }
    }

    /* registerForm!: FormGroup;
  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/),
        ],
      ],
      repassword: ['', Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/),
    ],
    }, { validators: this.passwordMatchValidator });
  }

  onSubmit(): void {
    if (this.selectedFile) {
      // Perform file upload logic here
      // You can use HttpClient to send the file to your backend server
      // For example:
      // const formData = new FormData();
      // formData.append('photo', this.selectedFile);
      // this.http.post('your-upload-url', formData).subscribe(...);
    } else {
      // Handle case when no file is selected
    }
    if (this.registerForm.valid) {
      // Handle registration logic here
      console.log(this.registerForm.value);
    } else {
      // Form is invalid, display error messages
      this.validateAllFormFields(this.registerForm);
    }
  }

  get name(): AbstractControl {
    return this.registerForm.get('name')!;
  }

  get email(): AbstractControl {
    return this.registerForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.registerForm.get('password')!;
  }

  get repassword(): AbstractControl {
    return this.registerForm.get('repassword')!;
  }

  passwordMatchValidator(formGroup: FormGroup): { passwordMismatch: boolean } | null {
    const password = formGroup.get('password')!.value;
    const repassword = formGroup.get('repassword')!.value;

    return password === repassword ? null : { passwordMismatch: true };
  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control!.markAsTouched({ onlySelf: true });
      }
    });
  }

   */
}
