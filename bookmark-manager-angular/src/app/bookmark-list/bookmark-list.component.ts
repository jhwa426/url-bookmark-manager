import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BookmarkService } from '../bookmark.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-bookmark-list',
    template: `
        <ul id="bookmark-list">
            <li *ngFor="let bookmark of paginatedBookmarks; let i = index">
                <span class="bookmark-number">{{ i + 1 }}.</span>
                <a [href]="bookmark" target="_blank" class="bookmark-url">{{ bookmark }}</a>
                <button class="edit-btn" (click)="editBookmark(i)"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete-btn" (click)="deleteBookmark(i)"><i class="fa-solid fa-delete-left"></i></button>
            </li>
        </ul>
    `,
    styleUrls: ['./bookmark-list.component.css'],
    standalone: true,
    imports: [CommonModule],
})


export class BookmarkListComponent implements OnInit, OnChanges {
    @Input() currentPage: number = 1; // An input property that stores the current page number for pagination.
    paginatedBookmarks: string[] = []; //  An array that holds the bookmarks to be displayed on the current page.


    constructor(private bookmarkService: BookmarkService) { }

    ngOnInit() {
        this.refreshBookmarks();
    }

    ngOnChanges() {
        this.refreshBookmarks();
    }

    refreshBookmarks() {
        this.paginatedBookmarks = this.bookmarkService.getPaginatedBookmarks();
    }

    editBookmark(index: number) {
        const globalIndex = (this.currentPage - 1) * this.bookmarkService.itemsPerPage + index;
        const newUrl = prompt('Enter new URL:', this.paginatedBookmarks[index]);

        if (newUrl) {
            // Attempt to edit the bookmark and check the result
            const validUrl = this.bookmarkService.editBookmark(globalIndex, newUrl);

            if (validUrl) {
                this.refreshBookmarks();  // Refresh the list only if the edit was successful
            } else {
                alert('This URL is already in the bookmark list or is invalid. Please enter a different URL.');
            }
        } else {
            alert('Please enter a valid URL.');
        }
    }

    deleteBookmark(index: number) {
        const globalIndex = (this.currentPage - 1) * this.bookmarkService.itemsPerPage + index;
        this.bookmarkService.deleteBookmark(globalIndex);
        this.refreshBookmarks();
    }
}
