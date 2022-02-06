import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerilComponent } from './peril/peril.component'
import { AuthGuard } from '../guards/auth.guard';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { CategoriaComponent } from './mantenimientos/categoria/categoria.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'account-settings', component: AccountSettingsComponent },
            { path: 'perfil', component: PerilComponent },
            { path: 'usuarios', component: UsuariosComponent },
            { path: 'categorias', component: CategoriaComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes),],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
