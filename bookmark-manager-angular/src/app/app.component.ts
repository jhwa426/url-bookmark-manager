import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-root',
    template: `
        <div class="container">
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
