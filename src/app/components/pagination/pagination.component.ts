import { CommonModule } from "@angular/common";
import {
    Component, EventEmitter, Input, Output
} from "@angular/core";

@Component({
    selector: "app-pagination",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./pagination.component.html",
    styleUrls: ["./pagination.component.css"]
})

export class PaginationComponent {
    @Input() currentPage: number = 0;
    @Input() itemsPerPage: number = 0;
    @Input() totalItems: number = 0;

    @Output() pageChange = new EventEmitter<number>();

    totalPages: number = 0;
    empty: boolean = false;

    ngOnChanges(): void {
        this.calculateTotalPages();
        this.empty = !this.totalPages;
    }

    calculateTotalPages(): void {
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    }

    onPageClick(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.pageChange.emit(page);
        }
    }

    isFirstPage(): boolean {
        return this.currentPage === 1;
    }

    isLastPage(): boolean {
        return this.currentPage === this.totalPages;
    }

    getPages(): number[] {
        const pages: number[] = [];
        for (let i = 1; i <= this.totalPages; i++) {
            pages.push(i);
        }
        return pages;
    }
}
