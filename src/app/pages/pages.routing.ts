import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        canActivate:[AuthGuard],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            {path:'account-settings',component:AccountSettingsComponent}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes),],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
