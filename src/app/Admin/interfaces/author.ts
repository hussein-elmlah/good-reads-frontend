// author.ts

export interface Author {
    _id?: number;
    firstName: string;
    lastName: string;
    dob: string | null;
    photo?: File | string;
    books: string;
  }
  