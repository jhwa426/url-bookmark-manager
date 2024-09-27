import { Component, EventEmitter, Output } from '@angular/core';
import { BookmarkService } from '../bookmark.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-add-bookmark',
    template: `
        <form (ngSubmit)="addBookmark()">
            <input type="url" [(ngModel)]="bookmarkUrl" name="bookmarkUrl" placeholder="Enter bookmark URL" required>
            <button type="submit" class="add-btn">
                <i class="fas fa-bookmark"></i>
            </button>
            <button type="button" (click)="resetBookmarks()" class="reset-btn">
                <i class="fa-solid fa-trash"></i>
            </button>
        </form>

        <p *ngIf="errorMessage" id="error-message">{{ errorMessage }}</p>
    `,
    styleUrls: ['./add-bookmark.component.css'],
    standalone: true,
    imports: [FormsModule, CommonModule],
})


export class AddBookmarkComponent {
    bookmarkUrl: string = ''; // A string property to store the URL entered by the user.
    errorMessage: string = ''; // A string property to display error messages related to URL validation and duplication

    @Output() bookmarkAdded = new EventEmitter<string>(); // An EventEmitter that emits the added bookmark URL to the parent component.
    @Output() bookmarksReset = new EventEmitter<void>();  // An EventEmitter that emits an event to reset the bookmarks in the parent component.

    constructor(private bookmarkService: BookmarkService) { }

    // Add url to the bookmark list 
    addBookmark() {
        if (this.bookmarkService.validateURL(this.bookmarkUrl)) {
            if (!this.bookmarkService.isDuplicate(this.bookmarkUrl)) {
                this.bookmarkService.addBookmark(this.bookmarkUrl);
                this.bookmarkAdded.emit(this.bookmarkUrl);
                this.bookmarkUrl = '';
                this.errorMessage = '';
            } else {
                this.errorMessage = 'This URL has already been submitted.';
            }
        } else {
            this.errorMessage = 'Please enter a valid URL.';
        }
    }

    resetBookmarks() {
        if (confirm('Are you sure you want to reset the list?')) {
            this.bookmarkService.resetBookmarks();
            this.bookmarksReset.emit();  // Emit reset event
        }
    }
}