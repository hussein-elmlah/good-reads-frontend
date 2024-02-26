import { Routes } from "@angular/router";

import { AdminAuthorsComponent } from "./Admin/admin-authors/admin-authors.component";
import { AdminBooksComponent } from "./Admin/admin-books/admin-books.component";
import { AdminCategoriesComponent } from "./Admin/admin-categories/admin-categories.component";
import { AdminloginComponent } from "./Admin/admin-login/admin-login.component";
import { AdminProfileComponent } from "./Admin/admin-profile/admin-profile.component";
import { AuthGuard } from "./Admin/guards/auth.guard";
import { AuthorsComponent } from "./Components/User/authors/authors.component";
import { AuthorsDetailsComponent } from "./Components/User/authors-details/authors-details.component";
import { BooksComponent } from "./Components/User/books/books.component";
import { BooksDetailsComponent } from "./Components/User/books-details/books-details.component";
import { CategoriesComponent } from "./Components/User/categories/categories.component";
import { CategoryDetailsComponent } from "./Components/User/category-details/category-details.component";
import { HomeComponent } from "./Components/User/home/home.component";
import { LoginComponent } from "./Components/User/login/login.component";
import { PageNotFoundComponent } from "./Components/User/page-not-found/page-not-found.component";
import { RegisterComponent } from "./Components/User/register/register.component";
import { WelcomLoginComponent } from "./Components/User/welcom-login/welcom-login.component";
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
