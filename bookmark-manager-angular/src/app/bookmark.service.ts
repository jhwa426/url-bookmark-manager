import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})


export class BookmarkService {
    private urlBookmarks: string[] = [];
    public itemsPerPage: number = 20;
    private currentPage: number = 1;

    // Default - load the bookmarks
    constructor() {
        this.loadBookmarks();
    }

    // Checks for the availability of localStorage and retrieves stored bookmarks by accessing the urlBookmarks key.
    loadBookmarks() {
        if (typeof localStorage !== 'undefined') {
            const storedBookmarks = localStorage.getItem('urlBookmarks');
            if (storedBookmarks) {
                this.urlBookmarks = JSON.parse(storedBookmarks);
            }
        }
    }

    // Ensures the current state of the urlBookmarks array is saved to localStorage
    saveBookmarks() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('urlBookmarks', JSON.stringify(this.urlBookmarks));
        }
    }

    // Adds a new URL to the bookmarks and saves the updated list.
    addBookmark(url: string) {
        this.urlBookmarks.push(url);
        this.saveBookmarks();
    }

    // Clears all bookmarks and saves the empty list.
    resetBookmarks() {
        this.urlBookmarks = [];
        this.saveBookmarks();
    }

    // Returns a subset of bookmarks corresponding to the current page.
    getPaginatedBookmarks(): string[] {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.urlBookmarks.slice(start, end);
    }

    // Calculates the total number of pages based on the number of bookmarks and items per page.
    getTotalPages(): number {
        return Math.ceil(this.urlBookmarks.length / this.itemsPerPage);
    }

    // Updates the current page.
    changePage(page: number) {
        this.currentPage = page;
    }

    // Validates and updates a bookmark at a specified index, ensuring the new URL is not a duplicate.
    editBookmark(index: number, newUrl: string): boolean {
        // Validate the new URL
        if (!this.validateURL(newUrl)) {
            return false;  // Indicate failure due to invalid URL
        }

        // Check for duplicates, excluding the current index
        if (this.isDuplicate(newUrl) && this.urlBookmarks[index] !== newUrl) {
            return false;  // Indicate failure due to duplicate URL
        }

        // If the URL is valid and not a duplicate, update the bookmark
        this.urlBookmarks[index] = newUrl;
        this.saveBookmarks();
        return true;  // Indicate success
    }

    // Removes a bookmark at a specified index.
    deleteBookmark(index: number) {
        this.urlBookmarks.splice(index, 1);
        this.saveBookmarks();
    }

    // Validates a URL using a regular expression.
    validateURL(url: string): boolean {
        const regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]{1,63}\.)+([a-zA-Z]{2,6})(:[0-9]{1,5})?(\/[^\s]*)?$/;
        return regex.test(url);
    }

    // Checks if a URL already exists in the bookmarks.
    isDuplicate(url: string): boolean {
        return this.urlBookmarks.includes(url);
    }
}
