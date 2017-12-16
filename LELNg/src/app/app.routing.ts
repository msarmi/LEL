import { Routes, RouterModule } from '@angular/router';
import { LelProjectsComponent } from './pages/lel-projects/lel-projects.component';
import { SymbolsComponent } from './pages/symbols/symbols.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { UserEditorComponent } from './pages/users/user-editor/user-editor.component';

const ROUTES: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full', data: [{ title: 'Dashboard' }] },
    { path: 'dashboard', component: DashboardComponent,  data: [{ title: 'Dashboard' }]},
    { path: 'lelprojects', component: LelProjectsComponent, data: [{ title: 'Projects' }] },
    { path: 'symbols', component: SymbolsComponent, data: [{ title: 'Symbols' }] } ,
    { path: 'users', component: UsersComponent, data: [{ title: 'Users' }] },
    { path: 'user/:id', component: UserEditorComponent}
];

export const routing = RouterModule.forRoot(ROUTES);
