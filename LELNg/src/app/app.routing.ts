import { Routes, RouterModule } from '@angular/router';
import { LelProjectsComponent } from './pages/lel-projects/lel-projects.component';
import { SymbolsComponent } from './pages/symbols/symbols.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { UserEditorComponent } from './pages/users/user-editor/user-editor.component';
import { SymbolEditorComponent } from './pages/symbols/symbol-editor/symbol-editor.component';
import { LelViewComponent } from './pages/lel-projects/lel-view/lel-view.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BasicPageComponent } from './layout/basic-page/basic-page.component';

const ROUTES: Routes = [
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full', data: [{ title: 'Dashboard' }] },
    // { path: 'dashboard', component: DashboardComponent,  data: [{ title: 'Dashboard' }]},
    // { path: 'symbols', component: SymbolsComponent, data: [{ title: 'Symbols' }] } ,
    // { path: 'users', component: UsersComponent, data: [{ title: 'Users' }] },
    // { path: 'user/:id', component: UserEditorComponent},
    // { path: 'symbol/:id', component: SymbolEditorComponent},

    { path: '', component: BasicPageComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(ROUTES/*,    { enableTracing: true }*/);
