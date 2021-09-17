import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-recovery-password',
    templateUrl: './recovery-password.component.html',
    styleUrls: ['./recovery-password.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecoveryPasswordComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
