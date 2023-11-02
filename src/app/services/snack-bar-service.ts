import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../Components/snack-bar/snack-bar.component';

@Injectable({
    providedIn: 'root',
})
export class SnackBarService {
    constructor(private _snackBar: MatSnackBar) { }

    show(message: string) {
        this._snackBar.openFromComponent(SnackBarComponent, {
            duration: 2000,
            data: { message }
        });
    }

    showError(message?: string) {
        this._snackBar.openFromComponent(SnackBarComponent, {
            duration: 5000,
            panelClass: ['snackbar-error'],
            data: { message: message || 'Något gick fel!' }
        });
    }
}
