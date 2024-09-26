// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// @Component({
//     selector: 'app-results',
//     templateUrl: './results.component.html',
//     styleUrls: ['./results.component.css'],
//     standalone: true,
//     imports: [CommonModule, RouterModule]
// })
// export class ResultsComponent implements OnInit {
//     submittedUrl: string | null = null;

//     constructor(private route: ActivatedRoute) { }

//     ngOnInit() {
//         this.route.queryParams.subscribe(params => {
//             this.submittedUrl = params['url'];
//         });
//     }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
    submittedUrl: string | null = null;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.submittedUrl = params['url'];
            console.log("Received URL: ", this.submittedUrl);  // Debugging log
        });
    }
}
