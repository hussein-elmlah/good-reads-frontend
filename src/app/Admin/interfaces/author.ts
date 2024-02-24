// export interface Author {
//   id?: number; // Change this line to use 'number' type
//   fisrtname: string;
//   lastname: string;
//   DOB: Date|null;
//   image?: File | string;
//   Books: string;
// }
export interface Author {
    id?: number;
    fisrtname: string;
    lastname: string;
    DOB: string | null; // Change the type to string
    image?: File | string;
    Books: string;
}
