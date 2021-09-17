import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RecoveryPasswordGuard } from './guards/recovery-password.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { GamesComponent } from './pages/games/games.component';
import { HomeComponent } from './pages/home/home.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard, RecoveryPasswordGuard],
        children: [
            {
                path: '',
                component: GamesComponent
            },
            {
                path: 'admin',
                // canActivate: [AdminGuard],
                loadChildren: () =>
                    import('./pages/admin/admin.module').then(
                        m => m.AdminModule
                    )
            }
        ]
    },
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'recovery-password',
        component: RecoveryPasswordComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
