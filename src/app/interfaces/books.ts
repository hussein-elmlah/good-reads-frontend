export interface Book {
    _id: number;
    img: string;
    name: string;
    author_id: number;
    author: any;
    category_id: number;
    category: any;
    reviews?: Array<any>;
    rating?: number;
    book_status?: any;
}
