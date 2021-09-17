import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewPlatformComponent } from './new-platform/new-platform.component';

@NgModule({
    declarations: [DashboardComponent, NewPlatformComponent],
    imports: [CommonModule, AdminRoutingModule]
})
export class AdminModule {}
