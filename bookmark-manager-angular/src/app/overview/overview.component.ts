import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddBookmarkComponent } from '../add-bookmark/add-bookmark.component';
import { BookmarkListComponent } from '../bookmark-list/bookmark-list.component';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
    selector: 'app-overview',
    template: `
        <app-add-bookmark (bookmarkAdded)="goToResults($event)"></app-add-bookmark>
        <app-bookmark-list></app-bookmark-list>
        <app-pagination></app-pagination>
    `,
    standalone: true,
    imports: [AddBookmarkComponent, BookmarkListComponent, PaginationComponent]
})
export class OverviewComponent {
    constructor(private router: Router) { }

    goToResults(bookmarkUrl: string) {
        this.router.navigate(['/results'], { queryParams: { url: bookmarkUrl } });
    }
}
