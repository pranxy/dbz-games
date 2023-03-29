import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
    games: Game[] = [];

    constructor(private readonly supabase: SupabaseService) {}

    ngOnInit(): void {
        this.fetchTodos();
    }

    async fetchTodos(): Promise<void> {
        let { data: games, error } = await this.supabase.fetchGames();

        console.log(games);

        if (error) {
            console.error('error', error.message);
        } else {
            // this.games = games ?? [];
        }
    }
}
