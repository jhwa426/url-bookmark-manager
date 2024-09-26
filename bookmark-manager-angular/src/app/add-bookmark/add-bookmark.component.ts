import { Component, EventEmitter, Output } from '@angular/core';
import { BookmarkService } from '../bookmark.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-add-bookmark',
    templateUrl: './add-bookmark.component.html',
    styleUrls: ['./add-bookmark.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule],
})
export class AddBookmarkComponent {
    bookmarkUrl: string = '';
    errorMessage: string = '';
    @Output() bookmarkAdded = new EventEmitter<string>();

    constructor(private bookmarkService: BookmarkService) { }

    addBookmark() {
        if (this.bookmarkService.validateURL(this.bookmarkUrl)) {
            this.bookmarkService.addBookmark(this.bookmarkUrl);
            this.bookmarkAdded.emit(this.bookmarkUrl);
            this.bookmarkUrl = '';
            this.errorMessage = '';
        } else {
            this.errorMessage = 'Please enter a valid URL.';
        }
    }

    resetBookmarks() {
        if (confirm('Are you sure you want to reset the list?')) {
            this.bookmarkService.resetBookmarks();
        }
    }
}