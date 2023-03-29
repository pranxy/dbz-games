import { Injectable } from '@angular/core';
import { AuthChangeEvent, createClient, Provider, Session, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

interface AddGame {}

@Injectable({
    providedIn: 'root'
})
export class SupabaseService {
    private supabase: SupabaseClient;
    token: string | undefined;
    private currentUser: BehaviorSubject<User | boolean> = new BehaviorSubject(null);

    constructor() {
        this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

        this.supabase.auth.onAuthStateChange((event, sess) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                console.log('SET USER');

                this.currentUser.next(sess.user);
            } else {
                this.currentUser.next(false);
            }
        });

        this.loadUser();
    }

    async loadUser() {
        if (this.currentUser.value) {
            // User is already set, no need to do anything else
            return;
        }
        const user = await this.supabase.auth.getUser();

        if (user.data.user) {
            this.currentUser.next(user.data.user);
        } else {
            this.currentUser.next(false);
        }
    }

    async getSession(): Promise<Session | null> {
        return (await this.supabase.auth.getSession()).data.session;
    }

    signUp(email: string, password: string) {
        return this.supabase.auth.signUp({ email, password });
    }

    signIn(email: string, password: string) {
        return this.supabase.auth.signInWithPassword({ email, password });
    }

    signInWithProvider(provider: Provider) {
        // return this.supabaseClient.auth.signInWithSSO({ provider });
    }

    signOut() {
        this.supabase.auth.signOut().catch(console.error);
    }

    authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
        return this.supabase.auth.onAuthStateChange(callback);
    }

    resetPassword(email: string) {
        return this.supabase.auth.resetPasswordForEmail(email);
    }

    handleNewPassword(newPassword: string) {
        this.supabase.auth.updateUser({
            password: newPassword
        });
        // return this.supabaseClient.auth.updateUser(this.token as string, {
        //     password: newPassword
        // });
    }

    async upload(path: string, file: File, bucket = 'games') {
        const { data, error } = await this.supabase.storage.from(bucket).upload(path, file);

        return { data, error };
    }

    fetchGames() {
        return this.supabase
            .from('games')
            .select(
                `
                id,
                name,
                img_url,
                year,
                consoles (
                    id,
                    name
                )
            `
            )
            .order('id', { ascending: false });
    }

    addTodo({ game, platform, year }: { game: string; platform: string; year: string }) {
        // const userId = this.getSession()?.user?.id as string;
        const userId = '';
        return this.supabase.from('games').insert({ game, platform, year, user_id: userId }).single();
    }

    toggleAcquired(id: string, isAcquired: boolean) {
        return this.supabase.from('games').update({ is_acquired: !isAcquired }).eq('id', id).single();
    }

    deleteTodo(id: string) {
        return this.supabase.from('games').delete().eq('id', id);
    }
}
