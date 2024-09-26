import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "./app/app.component";
import { ResultsComponent } from "./app/results/results.component";

const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'results', component: ResultsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
