import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';
import { SupabaseService } from './supabase.service';

@Injectable({
    providedIn: 'root'
})
export class GamesService extends BaseService<any> {
    constructor(protected supabase: SupabaseService, private auth: AuthService) {
        super(supabase, 'games');
    }

    games() {
        // const { publicUrl } = this.supabase.storage
        //     .from('dbz')
        //     .getPublicUrl('FC72-B20-DBZ2-01.gif');
        // console.log(publicUrl);
        const select = `
            id,
            name,
            year,
            img_url,
            console_game (
                consoles (
                    id,
                    name
                )
            )
        `;

        // return this.find([], select, undefined, [['id', false]]);

        // return this.supabase
        //     .get('games', select)

        //     .order('id', { ascending: false });
    }

    // addTodo({
    //     game,
    //     platform,
    //     year
    // }: {
    //     game: string;
    //     platform: string;
    //     year: string;
    // }) {
    //     const userId = this.auth.getSession()?.user?.id as string;

    //     return this.supabase.get('games');

    //     return this.supabase
    //         .from('games')
    //         .insert({ game, platform, year, user_id: userId })
    //         .single();
    // }

    // toggleAcquired(id: string, isAcquired: boolean) {
    //     return this.supabase
    //         .from('games')
    //         .update({ is_acquired: !isAcquired })
    //         .eq('id', id)
    //         .single();
    // }

    // deleteTodo(id: string) {
    //     return this.supabase.from('games').delete().eq('id', id);
    // }
}

// import { Injectable } from '@angular/core';
// import {
//     AuthChangeEvent,
//     createClient,
//     Provider,
//     Session,
//     SupabaseClient
// } from '@supabase/supabase-js';
// import { SupabaseAuthClient } from '@supabase/supabase-js/dist/main/lib/SupabaseAuthClient';
// import { from, map, Observable } from 'rxjs';
// import { environment } from '../../environments/environment';

// interface AddGame {}

// @Injectable({
//     providedIn: 'root'
// })
// export class SupabaseService {
//     private supabase: SupabaseClient;
//     token: string | undefined;

//     constructor() {
//         this.supabase = createClient(
//             environment.supabaseUrl,
//             environment.supabaseKey
//         );
//     }

//     get auth(): SupabaseAuthClient {
//         return this.supabase.auth;
//     }

//     get(
//         resource: string,
//         select = '*',
//         where: null | ((p: any) => any) = null,
//         limit?: number
//     ): Observable<any> {
//         const query = this.supabase.from(resource).select(select);

//         if (where !== null) {
//             where(query);
//         }

//         if (limit) {
//             query.limit(limit);
//         }

//         return from(query).pipe(map(res => res['body']));
//     }

//     fetchGames() {
//         // const { publicUrl } = this.supabase.storage
//         //     .from('dbz')
//         //     .getPublicUrl('FC72-B20-DBZ2-01.gif');
//         // console.log(publicUrl);

//         return this.supabase
//             .from('games')
//             .select(
//                 `
//                 id,
//                 name,
//                 year,
//                 img_url,
//                 consoles (
//                     id,
//                     name
//                 )
//             `
//             )
//             .order('id', { ascending: false });
//     }

//     getStorage(from = 'dbz') {
//         return this.supabase.storage.from('dbz');
//     }

//     addTodo({
//         game,
//         platform,
//         year
//     }: {
//         game: string;
//         platform: string;
//         year: string;
//     }) {
//         const userId = this.getSession()?.user?.id as string;
//         return this.supabase
//             .from('games')
//             .insert({ game, platform, year, user_id: userId })
//             .single();
//     }

//     toggleAcquired(id: string, isAcquired: boolean) {
//         return this.supabase
//             .from('games')
//             .update({ is_acquired: !isAcquired })
//             .eq('id', id)
//             .single();
//     }

//     deleteTodo(id: string) {
//         return this.supabase.from('games').delete().eq('id', id);
//     }
// }
