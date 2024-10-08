import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookmarkService } from '../bookmark.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pagination',
    template: `
    <div class="pagination">
        <button *ngIf="currentPage > 1" (click)="changePage(currentPage - 1)">&lt;</button>
        <button *ngFor="let page of totalPages" (click)="changePage(page)">{{ page }}</button>
        <button *ngIf="currentPage < totalPages.length" (click)="changePage(currentPage + 1)">&gt;</button>
    </div>
    `,
    styleUrls: ['./pagination.component.css'],
    standalone: true,
    imports: [CommonModule],
})


export class PaginationComponent implements OnInit {
    currentPage: number = 1; // A number property that stores the current page number.
    totalPages: number[] = []; // An array that holds the total number of pages.

    @Output() pageChanged = new EventEmitter<number>();

    constructor(private bookmarkService: BookmarkService) { }

    ngOnInit() {
        this.updateTotalPages();
    }

    updateTotalPages() {
        const totalPages = this.bookmarkService.getTotalPages();
        this.totalPages = Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    changePage(page: number) {
        if (page >= 1 && page <= this.totalPages.length) {
            this.currentPage = page;
            this.bookmarkService.changePage(page);  // Update the current page in the service
            this.pageChanged.emit(page);  // Emit the page change event to notify other components
            this.updateTotalPages();  // Refresh the total pages
        }
    }
}