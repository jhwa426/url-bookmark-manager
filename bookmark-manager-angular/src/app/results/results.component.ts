import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-results',
    template: `
        <div class="results-page">
            <h2>Thank you for your submission!</h2>
            <p>Your submitted URL: <a [href]="submittedUrl" target="_blank">{{ submittedUrl }}</a></p>
            <a routerLink="/">Back to Overview</a>
        </div>
    `,
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class ResultsComponent implements OnInit {
    submittedUrl: string | null = null;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.submittedUrl = params['url'];
            console.log("Received URL: ", this.submittedUrl);
        });
    }
}