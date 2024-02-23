export interface Author {
  id?: number; // Change this line to use 'number' type
  fisrtname: string;
  lastname: string;
  DOB: Date;
  image?: File | string;
  Books: string;
}
