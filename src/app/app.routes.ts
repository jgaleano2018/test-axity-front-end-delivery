
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConciliationComponent } from './components/conciliation/conciliation.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent }
];
