import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AddBookmarkComponent } from "./add-bookmark/add-bookmark.component";
import { BookmarkListComponent } from "./bookmark-list/bookmark-list.component";
import { PaginationComponent } from "./pagination/pagination.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [RouterModule, AddBookmarkComponent, BookmarkListComponent, PaginationComponent]
})


export class AppComponent {
    title = 'url-bookmark-manager';

    constructor(private router: Router) { }

    goToResults(bookmarkUrl: string) {
        this.router.navigate(['/results'], { queryParams: { url: bookmarkUrl } });
    }
}
