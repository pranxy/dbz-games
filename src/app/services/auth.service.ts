import { Injectable } from '@angular/core';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

interface AddGame {}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    token: string | undefined;

    constructor(private supabase: SupabaseService) {}

    getSession(): Session | null {
        return this.supabase.session;
    }

    signUp(email: string, password: string) {
        return this.supabase.signUp({ email, password });
    }

    signIn(email: string, password: string) {
        return this.supabase.signIn({ email, password });
    }

    // signInWithProvider(provider: Provider) {
    //     return this.supabase.auth.signIn({ provider });
    // }

    signOut() {
        this.supabase.signOut().catch(console.error);
    }

    authChanges(
        callback: (event: AuthChangeEvent, session: Session | null) => void
    ) {
        return this.supabase.authChanges(callback);
    }

    resetPassword(email: string) {
        return this.supabase.api.resetPasswordForEmail(email);
    }

    handleNewPassword(newPassword: string) {
        return this.supabase.api.updateUser(this.token as string, {
            password: newPassword
        });
    }
}
