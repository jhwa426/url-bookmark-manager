import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Import the components
import { AppComponent } from './app/app.component';
import { AddBookmarkComponent } from './app/add-bookmark/add-bookmark.component';
import { BookmarkListComponent } from './app/bookmark-list/bookmark-list.component';
import { PaginationComponent } from './app/pagination/pagination.component';
import { ResultsComponent } from "./app/results/results.component";

// Import the service
import { BookmarkService } from './app/bookmark.service';


const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'results', component: ResultsComponent }
];

@NgModule({
    declarations: [
        AppComponent,    // Declare the main AppComponent
        AddBookmarkComponent,    // Declare AddBookmarkComponent
        BookmarkListComponent,    // Declare BookmarkListComponent
        PaginationComponent,    // Declare PaginationComponent
        ResultsComponent,
    ],
    imports: [
        BrowserModule,    // BrowserModule is required for browser apps
        CommonModule,     // CommonModule is used for common Angular directives (like *ngIf, *ngFor)
        FormsModule,       // FormsModule is used for two-way data binding in forms
        RouterModule.forRoot(routes),
    ],
    providers: [BookmarkService],   // Provide the BookmarkService to make it available throughout the app
    bootstrap: [AppComponent]   // Bootstrap the AppComponent
})
export class AppModule { }
