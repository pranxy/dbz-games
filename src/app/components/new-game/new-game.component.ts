import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
    selector: 'app-new-game',
    templateUrl: './new-game.component.html',
    styleUrls: ['./new-game.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatButtonModule]
})
export class NewGameComponent implements OnInit {
    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {}

    open() {
        this.dialog.open(NewGameDialog, {
            width: '500px'
        });
    }
}

@Component({
    styleUrls: ['./new-game-dialog.scss'],
    templateUrl: 'new-game-dialog.html',
    standalone: true,
    imports: [
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NgFor,
        MatOptionModule,
        MatDatepickerModule,
        MatButtonModule
    ]
})
export class NewGameDialog {
    form: UntypedFormGroup = new UntypedFormGroup({
        game: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
        year: new UntypedFormControl(''),
        platforms: new UntypedFormControl()
    });

    message: string | null;
    status: boolean | undefined;
    bucket: string | undefined;

    platforms = ['NES', 'SUPER NES'];

    get platformsCtrl() {
        return this.form.get('flatforms') as UntypedFormControl;
    }

    constructor(private readonly supabase: SupabaseService) {
        this.message = null;
        this.status = false;
    }

    selectFile(event: Event) {
        const input = event.target as HTMLInputElement;

        if (!input.files || input.files.length == 0) {
            this.message = 'You must select an image to upload.';
            return;
        }

        this.status = true;
        const file: File = input.files[0];
        const name = file.name.replace(/ /g, '');

        this.supabase.upload(name, file).then(data => {
            if (data.error) {
                this.message = `Error send message ${data.error.message}`;
            } else {
                console.log(data.data);
                this.message = `File ${file.name} uploaded with success!`;
            }
            this.status = false;
        });
    }
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
