import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/books';
import { Author } from '../interfaces/author';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class BokksService {
  private apiUrl = 'http://localhost:3000/books';
  private authorsUrl = 'http://localhost:3000/authors';
  private categoriesUrl = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.authorsUrl);
  }

  getCategories(): Observable<Category[]> { // Ensure the correct return type
    return this.http.get<Category[]>(this.categoriesUrl);
  }
  addBook(book: Book): Observable<any> {
    return this.http.post<any>(this.apiUrl, book);
  }

  updateBook(updatedBook: Book): Observable<any> {
    const url = `${this.apiUrl}/${updatedBook.id}`;
    const { id, ...bookWithoutId } = updatedBook;
    
    return this.http.put<any>(url, bookWithoutId);
  }

  deleteBook(bookId: number): Observable<any> {
    const url = `${this.apiUrl}/${bookId}`;
    return this.http.delete<any>(url);
  }}
