import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class SnackBarService {
    constructor(private _snackBar: MatSnackBar) { }

    show(message: string) {
        this._snackBar.open(message, 'Stäng', {
            duration: 2000
        });
    }

    showError() {
        this._snackBar.open('Något gick fel!', 'Stäng', {
            duration: 5000,
            panelClass: ['snackbar-error']
        });
    }
}
