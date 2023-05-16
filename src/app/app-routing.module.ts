import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RecoveryPasswordGuard } from './guards/recovery-password.guard';

const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home').then(c => c.HomeComponent),
        canActivate: [AuthGuard, RecoveryPasswordGuard]
        // children: [
        //     {
        //         path: '',
        //         component: GamesComponent
        //     },
        //     {
        //         path: 'admin',
        //         // canActivate: [AdminGuard],
        //         loadChildren: () =>
        //             import('./pages/admin/admin.module').then(
        //                 m => m.AdminModule
        //             )
        //     }
        // ]
    },
    {
        path: 'auth',
        loadComponent: () => import('./pages/auth').then(c => c.AuthComponent)
    },
    {
        path: 'recovery-password',
        loadComponent: () => import('./pages/recovery-password').then(c => c.RecoveryPasswordComponent)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
