import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';
import { GameItemComponent } from './pages/game-item/game-item.component';
import { JoinPipe } from './pages/game-item/join.pipe';
import { HeaderComponent } from './pages/home/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';

const material = [
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatPaginatorModule,
];

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        HomeComponent,
        GameItemComponent,
        RecoveryPasswordComponent,
        GameItemComponent,
        HeaderComponent,
        JoinPipe,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ...material,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
