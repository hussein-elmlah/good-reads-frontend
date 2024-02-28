import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Author } from '../interfaces/author.model';
import { Book } from '../interfaces/books';

@Injectable({
  providedIn: 'any'
})
export class AuthorsService {

  baseURL = `http://localhost:3000`;

  constructor(private _HttpClient:HttpClient) { }
    
  getAuthorBooks(authorId: any): Observable<Book[]> {
    authorId = Number(authorId);
    const url = `${this.baseURL}/books`;
    return this._HttpClient.get<Book[]>(url).pipe(
      map((books: any[]) => books.filter(book => {
        return book.author_id == authorId}
        ))
    );
  }
  

  limit = 8
  currentPage = 1
  getAuthors():Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/authors/?page=${this.currentPage}&limit=${this.limit}`);
    // return this.dummyData();
  }

  getAuthorById(id:number):Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/authors/${id}`);
    // const dummyAuthors = this.dummyData();
    // return dummyAuthors.pipe( map((authors: any[]) => authors[1]) );
  }

  // getPopularAuthors(options:any): Observable<any>{
  //   return this._HttpClient.get(`${this.baseURL}/authors/all/popular`, options)
  // }

  updateBookStatus(status: string, bookId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const params = { status, token };
  console.log(`update book status ${status}`);
    return this._HttpClient.put(`${this.baseURL}/user/${bookId}`, { params });
  }

  // dummyData(): Observable<Author[]> {
  //   return of([
  //     { id: 1, firstName: 'Ahmed', lastName: 'Ali', dob: '1987-03-15', photo: 'https://randomuser.me/api/portraits/men/1.jpg' },
  //     { id: 2, firstName: 'Mohammed', lastName: 'Hassan', dob: '1990-05-20', photo: 'https://randomuser.me/api/portraits/men/2.jpg' },
  //     { id: 3, firstName: 'Youssef', lastName: 'Mahmoud', dob: '1982-12-10', photo: 'https://randomuser.me/api/portraits/men/3.jpg' },
  //     { id: 4, firstName: 'Omar', lastName: 'Said', dob: '1975-08-25', photo: 'https://randomuser.me/api/portraits/men/4.jpg' },
  //     { id: 5, firstName: 'Abdullah', lastName: 'Khalid', dob: '1989-02-18', photo: 'https://randomuser.me/api/portraits/men/5.jpg' },
  //     { id: 6, firstName: 'Khalil', lastName: 'Abdul', dob: '1980-07-05', photo: 'https://randomuser.me/api/portraits/men/6.jpg' },
  //     { id: 7, firstName: 'Ali', lastName: 'Ahmed', dob: '1978-11-30', photo: 'https://randomuser.me/api/portraits/men/7.jpg' },
  //     { id: 8, firstName: 'Mustafa', lastName: 'Ibrahim', dob: '1984-09-22', photo: 'https://randomuser.me/api/portraits/men/8.jpg' },
  //     { id: 9, firstName: 'Hussein', lastName: 'Yousef', dob: '1986-04-17', photo: 'https://randomuser.me/api/portraits/men/9.jpg' },
  //     { id: 10, firstName: 'Sami', lastName: 'Nasser', dob: '1992-06-12', photo: 'https://randomuser.me/api/portraits/men/10.jpg' },
  //     { id: 11, firstName: 'Ahmad', lastName: 'Fahad', dob: '1973-10-08', photo: 'https://randomuser.me/api/portraits/men/11.jpg' },
  //     { id: 12, firstName: 'Adel', lastName: 'Hadi', dob: '1988-01-25', photo: 'https://randomuser.me/api/portraits/men/12.jpg' },
  //     { id: 1, firstName: 'Ahmed', lastName: 'Ali', dob: '1987-03-15', photo: 'https://randomuser.me/api/portraits/men/1.jpg' },
  //     { id: 2, firstName: 'Mohammed', lastName: 'Hassan', dob: '1990-05-20', photo: 'https://randomuser.me/api/portraits/men/2.jpg' },
  //     { id: 3, firstName: 'Youssef', lastName: 'Mahmoud', dob: '1982-12-10', photo: 'https://randomuser.me/api/portraits/men/3.jpg' },
  //     { id: 4, firstName: 'Omar', lastName: 'Said', dob: '1975-08-25', photo: 'https://randomuser.me/api/portraits/men/4.jpg' },
  //     { id: 5, firstName: 'Abdullah', lastName: 'Khalid', dob: '1989-02-18', photo: 'https://randomuser.me/api/portraits/men/5.jpg' },
  //     { id: 6, firstName: 'Khalil', lastName: 'Abdul', dob: '1980-07-05', photo: 'https://randomuser.me/api/portraits/men/6.jpg' },
  //     { id: 7, firstName: 'Ali', lastName: 'Ahmed', dob: '1978-11-30', photo: 'https://randomuser.me/api/portraits/men/7.jpg' },
  //     { id: 8, firstName: 'Mustafa', lastName: 'Ibrahim', dob: '1984-09-22', photo: 'https://randomuser.me/api/portraits/men/8.jpg' },
  //     { id: 4, firstName: 'Omar', lastName: 'Said', dob: '1975-08-25', photo: 'https://randomuser.me/api/portraits/men/4.jpg' },
  //     { id: 5, firstName: 'Abdullah', lastName: 'Khalid', dob: '1989-02-18', photo: 'https://randomuser.me/api/portraits/men/5.jpg' },
  //     { id: 6, firstName: 'Khalil', lastName: 'Abdul', dob: '1980-07-05', photo: 'https://randomuser.me/api/portraits/men/6.jpg' },
  //     { id: 7, firstName: 'Ali', lastName: 'Ahmed', dob: '1978-11-30', photo: 'https://randomuser.me/api/portraits/men/7.jpg' },
  //     { id: 8, firstName: 'Mustafa', lastName: 'Ibrahim', dob: '1984-09-22', photo: 'https://randomuser.me/api/portraits/men/8.jpg' },
  //     { id: 9, firstName: 'Hussein', lastName: 'Yousef', dob: '1986-04-17', photo: 'https://randomuser.me/api/portraits/men/9.jpg' },
  //     { id: 10, firstName: 'Sami', lastName: 'Nasser', dob: '1992-06-12', photo: 'https://randomuser.me/api/portraits/men/10.jpg' },
  //     { id: 11, firstName: 'Ahmad', lastName: 'Fahad', dob: '1973-10-08', photo: 'https://randomuser.me/api/portraits/men/11.jpg' },
  //     { id: 12, firstName: 'Adel', lastName: 'Hadi', dob: '1988-01-25', photo: 'https://randomuser.me/api/portraits/men/12.jpg' },
  //   ]);
  // }


}