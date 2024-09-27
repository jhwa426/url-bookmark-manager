import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-results',
    template: `
        <div id="results-page">
            <h1>Thank you for your submission!</h1>
            <p id="submitted-url">Your submitted URL: <a [href]="submittedUrl" target="_blank">{{ submittedUrl }}</a></p>
            <a routerLink="/" id="back-to-overview">Back to Overview</a>
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
        });
    }
}