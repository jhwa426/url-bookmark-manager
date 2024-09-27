import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddBookmarkComponent } from '../add-bookmark/add-bookmark.component';
import { BookmarkListComponent } from '../bookmark-list/bookmark-list.component';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
    selector: 'app-overview',
    template: `
        <h1>URL Bookmark Manager</h1>
        <app-add-bookmark (bookmarkAdded)="goToResults($event)" (bookmarksReset)="onBookmarksReset()"></app-add-bookmark>
        <app-bookmark-list [currentPage]="currentPage"></app-bookmark-list>
        <app-pagination (pageChanged)="onPageChanged($event)"></app-pagination>
    `,
    standalone: true,
    imports: [AddBookmarkComponent, BookmarkListComponent, PaginationComponent]
})

export class OverviewComponent {
    currentPage: number = 1;

    constructor(private router: Router) { }

    // Navigates to the results page with the specified bookmark URL.
    goToResults(bookmarkUrl: string) {
        this.router.navigate(['/results'], { queryParams: { url: bookmarkUrl } });
    }

    // Updates the currentPage property based on the selected page.
    onPageChanged(page: number) {
        this.currentPage = page;
    }

    // Logs a message to the console and reloads the page to reset the bookmarks.
    onBookmarksReset() {
        console.log('Bookmarks have been reset.');

        location.reload();
    }
}
