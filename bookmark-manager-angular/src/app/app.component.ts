import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-root',
    template: `
        <div class="container">
            <h1>URL Bookmark Manager</h1>
            <router-outlet></router-outlet>
        </div>
    `,
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [RouterModule]
})


export class AppComponent {
    title = 'url-bookmark-manager';
}
