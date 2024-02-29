import { Author } from "./author";
import { Category } from "./category";

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
    category_id?: string | number; 
    category?: any;
    // category?: Category[]; 

  }
  