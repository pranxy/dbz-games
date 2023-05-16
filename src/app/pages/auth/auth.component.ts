import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Provider } from '@supabase/supabase-js';

interface HelperText {
    text: string;
    error: boolean;
}

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    standalone: true,
    imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
    authForm: UntypedFormGroup = new UntypedFormGroup({
        email: new UntypedFormControl('', [Validators.required, Validators.email]),
        password: new UntypedFormControl('', Validators.required)
    });

    helperText: HelperText | undefined;

    constructor(private readonly supabase: SupabaseService, private readonly router: Router) {}

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
        // const { email, password } = this.authForm.value;
        // const { user, error, session } =
        //     type === 'LOGIN' ? await this.supabase.signIn(email, password) : await this.supabase.signUp(email, password);
        // if (user && type === 'LOGIN') {
        //     await this.router.navigate(['/']);
        // } else if (error) {
        //     this.helperText = { error: true, text: error.message };
        // } else if (user && !session && !error) {
        //     this.helperText = {
        //         error: false,
        //         text: 'An email has been sent to you for verification!'
        //     };
        // }
    }

    async handleOAuthLogin(provider: Provider): Promise<void> {
        // You need to enable the third party auth you want in Authentication > Settings
        // Read more on: https://supabase.io/docs/guides/auth#third-party-logins
        // let { error } = await this.supabase.signInWithProvider(provider);
        // if (error) console.error('Error: ', error.message);
    }

    loginWithGithub() {}

    loginWithGoogle() {}
}
