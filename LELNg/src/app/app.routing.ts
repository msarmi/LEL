import { Routes, RouterModule } from '@angular/router';
import { LelProjectsComponent } from './pages/lel-projects/lel-projects.component';
import { SymbolsComponent } from './pages/symbols/symbols.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const ROUTES: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full', data: [{ title: 'Dashboard' }] },
    { path: 'dashboard', component: DashboardComponent,  data: [{ title: 'Dashboard' }]},
    { path: 'lelprojects', component: LelProjectsComponent, data: [{ title: 'Projects' }] },
    { path: 'symbols', component: SymbolsComponent, data: [{ title: 'Symbols' }] }
];

export const routing = RouterModule.forRoot(ROUTES);