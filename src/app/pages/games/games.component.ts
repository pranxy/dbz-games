import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game';
import { GamesService } from 'src/app/services/games.service';
import { GameItemComponent } from '../game-item/game-item.component';

@Component({
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.scss'],
    standalone: true,
    imports: [CommonModule, GameItemComponent]
})
export class GamesComponent implements OnInit {
    games$!: Observable<Game[]>;

    constructor(private readonly supabase: GamesService) {}

    ngOnInit(): void {
        this.fetchTodos();
        // this.games$ = this.fetchTodos();
    }

    async fetchTodos(): Promise<void> {
        // let { data: games, error } = await this.supabase.fetchGames();
        // console.log(games);
        // if (error) {
        //     console.error('error', error.message);
        // } else {
        //     // this.games = games ?? [];
        // }
    }
}
