import { Component, OnInit } from '@angular/core';
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