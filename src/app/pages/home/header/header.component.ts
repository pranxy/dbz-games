import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
    constructor(
        private readonly supabase: SupabaseService,
        private readonly router: Router
    ) {}

    ngOnInit(): void {}

    async handleLogout(): Promise<void> {
        try {
            await this.supabase.signOut();
            await this.router.navigate(['/auth']);
        } catch (error) {
            console.error(error);
        }
    }
}
