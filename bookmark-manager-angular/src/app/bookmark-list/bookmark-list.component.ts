import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../bookmark.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-bookmark-list',
    templateUrl: './bookmark-list.component.html',
    styleUrls: ['./bookmark-list.component.css'],
    standalone: true,
    imports: [CommonModule],
})
export class BookmarkListComponent implements OnInit {
    paginatedBookmarks: string[] = [];

    constructor(private bookmarkService: BookmarkService) { }

    ngOnInit() {
        this.refreshBookmarks();
    }

    refreshBookmarks() {
        this.paginatedBookmarks = this.bookmarkService.getPaginatedBookmarks();
    }

    editBookmark(index: number) {
        const newUrl = prompt('Enter new URL:', this.paginatedBookmarks[index]);
        if (newUrl && this.bookmarkService.validateURL(newUrl)) {
            this.bookmarkService.editBookmark(index, newUrl);
            this.refreshBookmarks();
        } else {
            alert('Please enter a valid URL.');
        }
    }

    deleteBookmark(index: number) {
        this.bookmarkService.deleteBookmark(index);
        this.refreshBookmarks();
    }
}