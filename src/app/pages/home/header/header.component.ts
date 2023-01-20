import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    constructor(
        private readonly auth: AuthService,
        private readonly router: Router
    ) {}

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
