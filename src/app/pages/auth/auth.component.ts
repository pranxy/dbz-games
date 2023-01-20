import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Provider } from '@supabase/supabase-js';
import { AuthService } from 'src/app/services/auth.service';

interface HelperText {
    text: string;
    error: boolean;
}

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
    authForm: UntypedFormGroup = new UntypedFormGroup({
        email: new UntypedFormControl('', [Validators.required, Validators.email]),
        password: new UntypedFormControl('', Validators.required)
    });

    helperText: HelperText | undefined;

    constructor(
        private readonly auth: AuthService,
        private readonly router: Router
    ) {}

    async forgotPassword(): Promise<void> {
        const email = prompt('Please enter your email:');

        let { error } = await this.auth.resetPassword(email as string);
        if (error) {
            console.error('Error: ', error.message);
        } else {
            this.helperText = {
                error: false,
                text: 'Password recovery email has been sent.'
            };
        }
    }

    async handleLogin(type: string): Promise<void> {
        const { email, password } = this.authForm.value;

        const { user, error, session } =
            type === 'LOGIN'
                ? await this.auth.signIn(email, password)
                : await this.auth.signUp(email, password);

        if (user && type === 'LOGIN') {
            await this.router.navigate(['/']);
        } else if (error) {
            this.helperText = { error: true, text: error.message };
        } else if (user && !session && !error) {
            this.helperText = {
                error: false,
                text: 'An email has been sent to you for verification!'
            };
        }
    }

    async handleOAuthLogin(provider: Provider): Promise<void> {
        // You need to enable the third party auth you want in Authentication > Settings
        // Read more on: https://supabase.io/docs/guides/auth#third-party-logins
        // let { error } = await this.auth.signInWithProvider(provider);
        // if (error) console.error('Error: ', error.message);
    }
}
