import { Injectable } from '@angular/core';
import {
    AuthChangeEvent,
    createClient,
    Session,
    SupabaseClient
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(
            environment.supabaseUrl,
            environment.supabaseKey
        );
    }

    get user() {
        return this.supabase.auth.user();
    }

    get session() {
        return this.supabase.auth.session();
    }

    get api() {
        return this.supabase.auth.api;
    }

    table(resource: string) {
        return this.supabase.from(resource);
    }

    authChanges(
        callback: (event: AuthChangeEvent, session: Session | null) => void
    ) {
        return this.supabase.auth.onAuthStateChange(callback);
    }

    signIn({ email, password }: { email: string; password: string }) {
        return this.supabase.auth.signIn({ email, password });
    }

    signUp({ email, password }: { email: string; password: string }) {
        return this.supabase.auth.signUp({ email, password });
    }

    signOut() {
        return this.supabase.auth.signOut();
    }
}
