import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game';
import { GamesService } from 'src/app/services/games.service';

@Component({
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
    games$!: Observable<Game[]>;

    constructor(private readonly supabase: GamesService) {}

    ngOnInit(): void {
        this.fetchTodos();
        this.games$ = this.fetchTodos();
    }

    fetchTodos(): Observable<Game[]> {
        return this.supabase.games();
    }
}
