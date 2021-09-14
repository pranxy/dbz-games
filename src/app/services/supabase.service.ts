import { Injectable } from '@angular/core';
import {
    AuthChangeEvent,
    createClient,
    Provider,
    Session,
    SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

interface AddGame {}

@Injectable({
    providedIn: 'root',
})
export class SupabaseService {
    private supabaseClient: SupabaseClient;
    token: string | undefined;

    constructor() {
        this.supabaseClient = createClient(
            environment.supabaseUrl,
            environment.supabaseKey
        );
    }

    getSession(): Session | null {
        return this.supabaseClient.auth.session();
    }

    signUp(email: string, password: string) {
        return this.supabaseClient.auth.signUp({ email, password });
    }

    signIn(email: string, password: string) {
        return this.supabaseClient.auth.signIn({ email, password });
    }

    signInWithProvider(provider: Provider) {
        return this.supabaseClient.auth.signIn({ provider });
    }

    signOut() {
        this.supabaseClient.auth.signOut().catch(console.error);
    }

    authChanges(
        callback: (event: AuthChangeEvent, session: Session | null) => void
    ) {
        return this.supabaseClient.auth.onAuthStateChange(callback);
    }

    resetPassword(email: string) {
        return this.supabaseClient.auth.api.resetPasswordForEmail(email);
    }

    handleNewPassword(newPassword: string) {
        return this.supabaseClient.auth.api.updateUser(this.token as string, {
            password: newPassword,
        });
    }

    fetchGames() {
        return this.supabaseClient
            .from('games')
            .select(
                `
                id,
                name,
                year,
                consoles (
                    id,
                    name
                )
            `
            )
            .order('id', { ascending: false });
    }

    addTodo({
        game,
        platform,
        year,
    }: {
        game: string;
        platform: string;
        year: string;
    }) {
        const userId = this.getSession()?.user?.id as string;
        return this.supabaseClient
            .from('games')
            .insert({ game, platform, year, user_id: userId })
            .single();
    }

    toggleAcquired(id: string, isAcquired: boolean) {
        return this.supabaseClient
            .from('games')
            .update({ is_acquired: !isAcquired })
            .eq('id', id)
            .single();
    }

    deleteTodo(id: string) {
        return this.supabaseClient.from('games').delete().eq('id', id);
    }
}
