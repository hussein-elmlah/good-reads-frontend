import { Author } from "./author";

// export interface Book {
//     id?: number;
//     name: string;
//     category: string;
//     authors: string;
//     image?: string;
// }

export interface Book {
    _id?: string;
    img: string;
    name: string;
    author_id?: string;
    author?: any;
    category_id?: string | number; // Allow both string and number
    category?: any;
  }
  