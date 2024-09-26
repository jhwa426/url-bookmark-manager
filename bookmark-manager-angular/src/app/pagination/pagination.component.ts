import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../bookmark.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css'],
    standalone: true,
    imports: [CommonModule],
})
export class PaginationComponent implements OnInit {
    currentPage: number = 1;
    totalPages: number[] = [];

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
        // Emit an event or use a service to refresh the bookmark list
    }
}