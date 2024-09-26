import { Routes } from '@angular/router';
import { OverviewComponent } from "./overview/overview.component";
import { ResultsComponent } from "./results/results.component";

export const routes: Routes = [
    { path: '', component: OverviewComponent },
    { path: 'results', component: ResultsComponent },
];