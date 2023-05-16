import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { NewGameComponent } from 'src/app/components/new-game';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatToolbarModule, RouterModule, NewGameComponent]
})
export class HeaderComponent implements OnInit {
    constructor(private readonly auth: AuthService, private readonly router: Router) {}

    ngOnInit(): void {}

    async handleLogout(): Promise<void> {
        try {
            await this.auth.signOut();
            await this.router.navigate(['/auth']);
        } catch (error) {
            console.error(error);
        }
    }
}
