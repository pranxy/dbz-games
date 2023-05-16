import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-new-platform',
    templateUrl: './new-platform.component.html',
    styleUrls: ['./new-platform.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class NewPlatformComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
