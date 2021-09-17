import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
    selector: 'app-new-game',
    templateUrl: './new-game.component.html',
    styleUrls: ['./new-game.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewGameComponent implements OnInit {
    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {}

    open() {
        this.dialog.open(NewGameDialog);
    }
}

@Component({
    styleUrls: ['./new-game-dialog.scss'],
    templateUrl: 'new-game-dialog.html'
})
export class NewGameDialog {
    form: FormGroup = new FormGroup({
        game: new FormControl('', [
            Validators.required,
            Validators.minLength(3)
        ]),
        year: new FormControl(''),
        platforms: new FormControl()
    });

    platforms = ['NES', 'SUPER NES'];

    get platformsCtrl() {
        return this.form.get('flatforms') as FormControl;
    }

    constructor(private readonly supabase: SupabaseService) {}

    // async addTodo(): Promise<void> {
    //     let game = this.form.value.game.trim();
    //     let platform = this.form.value.platform.trim();
    //     let year = this.form.value.year;

    //     let { data: todo, error } = await this.supabase.addTodo({
    //         game,
    //         platform,
    //         year,
    //     });
    //     if (error) {
    //         this.errorText = error.message;
    //     } else {
    //         this.games = [todo, ...this.games];
    //         this.errorText = null;
    //         this.form.reset();
    //     }
    // }
}
