import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Game } from 'src/app/models/game';
import { SupabaseService } from '../../services/supabase.service';
import { HeaderComponent } from './header/header.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [HeaderComponent, RouterModule]
})
export class HomeComponent implements OnInit {
    games: Game[] = [];
    todoForm: UntypedFormGroup = new UntypedFormGroup({
        game: new UntypedFormControl('', [Validators.required]),
        platform: new UntypedFormControl('', [Validators.required]),
        year: new UntypedFormControl()
    });
    errorText: string | undefined | null;

    constructor(private readonly supabase: SupabaseService) {}

    ngOnInit(): void {}

    async addTodo(): Promise<void> {
        let game = this.todoForm.value.game.trim();
        let platform = this.todoForm.value.platform.trim();
        let year = this.todoForm.value.year;

        if (game.length <= 3) {
            this.errorText = 'Task length should be more than 3!';
        } else {
            let { data: todo, error } = await this.supabase.addTodo({
                game,
                platform,
                year
            });
            if (error) {
                this.errorText = error.message;
            } else {
                // this.games = [todo, ...this.games];
                this.errorText = null;
                this.todoForm.reset();
            }
        }
    }

    async toggleAcquired(id: string, is_acquired: boolean): Promise<void> {
        // try {
        //     await this.supabase.toggleAcquired(id, is_acquired);
        //     this.games = this.games.map(todo => {
        //         if (todo.id === id) {
        //             return { ...todo, is_acquired: !is_acquired };
        //         }
        //         return todo;
        //     });
        // } catch (error) {
        //     console.error(error);
        // }
    }

    async delete(id: string): Promise<void> {
        // try {
        //     await this.supabase.deleteTodo(id);
        //     this.games = this.games.filter(todo => todo.id !== id);
        // } catch (error) {
        //     console.error('error', error);
        // }
    }
}
