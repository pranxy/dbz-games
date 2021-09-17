import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewPlatformComponent } from './new-platform/new-platform.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    // {
    //     path: 'new-game',
    //     component: NewGameComponent,
    // },
    {
        path: 'new-platform',
        component: NewPlatformComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
