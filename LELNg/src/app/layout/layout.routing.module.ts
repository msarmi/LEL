import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LelProjectsComponent } from '../pages/lel-projects/lel-projects.component';
import { SymbolsComponent } from '../pages/symbols/symbols.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { UsersComponent } from '../pages/users/users.component';
import { UserEditorComponent } from '../pages/users/user-editor/user-editor.component';
import { SymbolEditorComponent } from '../pages/symbols/symbol-editor/symbol-editor.component';
import { LelViewComponent } from '../pages/lel-projects/lel-view/lel-view.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { BasicPageComponent } from './basic-page/basic-page.component';
import { lelProjectsRoutes } from '../pages/lel-projects/lel-projects-routing.module';

const layoutRoutes: Routes = [
    {
        path: '',
        component: BasicPageComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full', data: [{ title: 'Dashboard' }] },
            { path: 'dashboard', component: DashboardComponent, data: [{ title: 'Dashboard' }] },
            { path: 'projects', component: LelProjectsComponent, data: [{ title: 'Projects' }] },
            { path: 'symbols', component: SymbolsComponent, data: [{ title: 'Symbols' }] },
            { path: 'users', component: UsersComponent, data: [{ title: 'Users' }] },
            { path: 'user/:id', component: UserEditorComponent },
            { path: 'symbol/:id', component: SymbolEditorComponent },
            ...lelProjectsRoutes
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(layoutRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class LayoutRoutingModule { }
