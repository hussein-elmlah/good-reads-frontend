import { Author } from "./author";

export interface Book {
    id?: number;
    name: string;
    category: string;
    authors: Author[];
    image?: string;
  }