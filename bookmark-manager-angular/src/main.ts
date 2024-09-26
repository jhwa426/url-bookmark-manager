import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule),
        provideRouter(routes)
    ]
}).catch(err => console.error(err));