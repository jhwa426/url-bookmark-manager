import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BookmarkService {
    private urlBookmarks: string[] = [];
    private itemsPerPage: number = 20;
    private currentPage: number = 1;

    constructor() {
        this.loadBookmarks();
    }

    loadBookmarks() {
        if (typeof localStorage !== 'undefined') {
            const storedBookmarks = localStorage.getItem('urlBookmarks');
            if (storedBookmarks) {
                this.urlBookmarks = JSON.parse(storedBookmarks);
            }
        }
    }

    saveBookmarks() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('urlBookmarks', JSON.stringify(this.urlBookmarks));
        }
    }

    addBookmark(url: string) {
        this.urlBookmarks.push(url);
        this.saveBookmarks();
    }

    resetBookmarks() {
        this.urlBookmarks = [];
        this.saveBookmarks();
    }

    getPaginatedBookmarks(): string[] {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.urlBookmarks.slice(start, end);
    }

    getTotalPages(): number {
        return Math.ceil(this.urlBookmarks.length / this.itemsPerPage);
    }

    changePage(page: number) {
        this.currentPage = page;
    }

    editBookmark(index: number, newUrl: string) {
        this.urlBookmarks[index] = newUrl;
        this.saveBookmarks();
    }

    deleteBookmark(index: number) {
        this.urlBookmarks.splice(index, 1);
        this.saveBookmarks();
    }

    validateURL(url: string): boolean {
        const regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]{1,63}\.)+([a-zA-Z]{2,6})(:[0-9]{1,5})?(\/[^\s]*)?$/;
        return regex.test(url);
    }

    isDuplicate(url: string): boolean {
        return this.urlBookmarks.includes(url);
    }
}
