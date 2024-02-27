import { Routes } from "@angular/router";

import { AdminAuthorsComponent } from "./components/Admin/admin-authors/admin-authors.component";
import { AdminBooksComponent } from "./components/Admin/admin-books/admin-books.component";
import { AdminCategoriesComponent } from "./components/Admin/admin-categories/admin-categories.component";
import { AdminloginComponent } from "./components/Admin/admin-login/admin-login.component";
import { AdminProfileComponent } from "./components/Admin/admin-profile/admin-profile.component";
import { AuthGuard } from "./components/Admin/guards/auth.guard";
import { AuthorsComponent } from "./components/Authors/authors.component";
import { AuthorsDetailsComponent } from "./components/Authors/authors-details/authors-details.component";
import { BooksComponent } from "./components/Books/books.component";
import { BooksDetailsComponent } from "./components/Books/books-details/books-details.component";
import { CategoriesComponent } from "./components/Categories/categories.component";
import { CategoryDetailsComponent } from "./components/Categories/category-details/category-details.component";
import { HomeComponent } from "./components/User/home/home.component";
import { LoginComponent } from "./components/User/login/login.component";
import { PageNotFoundComponent } from "./components/User/page-not-found/page-not-found.component";
import { RegisterComponent } from "./components/User/register/register.component";
import { WelcomLoginComponent } from "./components/User/welcom-login/welcom-login.component";
import { authGuard } from "./guard/auth.guard";

export const routes:Routes = [

    {
        path: '',
        component: WelcomLoginComponent
    },
    {
        path: 'home',canActivate:[authGuard],
        component: HomeComponent
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    {
        path: 'categories',canActivate:[authGuard],
        component: CategoriesComponent
    },
    {
        path: 'categories/:categoryId',canActivate:[authGuard],
        component: CategoryDetailsComponent
    },
    {
        path: 'books',canActivate:[authGuard],
        component: BooksComponent
    },
    {
        path: 'books/:bookId',canActivate:[authGuard],
        component: BooksDetailsComponent
    }
    ,
    {
        path: 'authors',canActivate:[authGuard],
        component: AuthorsComponent
    }
    ,
    {
        path: 'authors/:authorId',canActivate:[authGuard],
        component: AuthorsDetailsComponent
    },

    {
        path: "admin",
        component: AdminloginComponent
    },
    {
        path: "adminProfile",
        component: AdminProfileComponent,
        canActivate: [AuthGuard],

        children: [
            { path: "books", component: AdminBooksComponent },
            { path: "categories", component: AdminCategoriesComponent },
            { path: "authors", component: AdminAuthorsComponent },
            { path: "", redirectTo: "categories", pathMatch: "full" },
        ],

    },
    {
        path: "**",
        component: PageNotFoundComponent
    }

];
