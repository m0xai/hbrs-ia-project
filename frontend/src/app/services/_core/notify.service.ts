import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class NotifyService {
    constructor(private snackBar: MatSnackBar) {}

    error(message: string) {
        this.openSnackBar('ERROR: ' + message, 'snackbar-error');
    }

    success(message: string) {
        this.openSnackBar('SUCCESS: ' + message, 'snackbar-success');
    }

    warn(message: string) {
        this.openSnackBar('WARNING: ' + message, 'snackbar-warn');
    }

    info(message: string) {
        this.openSnackBar('INFO: ' + message, 'snackbar-info');
    }

    openSnackBar(message: string, className = '', duration = 5000) {
        this.snackBar.open(message, null, {
            duration,
            panelClass: [className],
            verticalPosition: 'top',
        });
    }
}
