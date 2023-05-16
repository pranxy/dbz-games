import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from 'src/app/models/game';
import { JoinPipe } from './join.pipe';

@Component({
    selector: 'app-game-item',
    templateUrl: './game-item.component.html',
    styleUrls: ['./game-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, JoinPipe]
})
export class GameItemComponent {
    @Input() todo: Game | undefined;

    @Output() delete: EventEmitter<void> = new EventEmitter<void>();

    @Output() toggleComplete: EventEmitter<void> = new EventEmitter<void>();
}
