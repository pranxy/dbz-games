import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';
import { GameItemComponent } from './pages/game-item/game-item.component';
import { HomeComponent } from './pages/home/home.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        HomeComponent,
        GameItemComponent,
        RecoveryPasswordComponent,
        GameItemComponent,
    ],
    imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
