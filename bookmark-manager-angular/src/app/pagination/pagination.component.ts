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
    currentPage: number = 1;
    totalPages: number[] = [];

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
        this.currentPage = page;
        this.bookmarkService.changePage(page);
        this.pageChanged.emit(page);
    }
}