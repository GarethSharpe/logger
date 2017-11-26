import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataService } from '../data.service';

@Component({
  selector: 'app-logger-dialog',
  templateUrl: 'dialog.component.html'
})
export class DialogComponent {

  logger: string;
  location: string;
  id: string;
  url: string;

  constructor(
    public dialog: MatDialog,
    private dataAPI: DataService) { }

  openAddDialog(): void {
    let dialogRef = this.dialog.open(DialogAddLoggerDialog, {
      width: '250px',
      data: { logger: this.logger, location: this.location, url: this.url }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.logger != null && result.location != null && result.url != null) {
      	this.dataAPI.createNewLogger(
          result.logger,
          result.location,
          result.url).then((logger) => {
            this.dataAPI.setLogger(logger);
          });
      }
    });
  }

  openRemoveDialog(): void {
    let dialogRef = this.dialog.open(DialogRemoveLoggerDialog, {
      width: '250px',
      data: { id: this.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.id != null) {
        this.dataAPI.deleteLogger(result.id);
      }
    });
  }



}

@Component({
  selector: 'dialog-add-logger-dialog',
  templateUrl: 'dialog-add-logger-dialog.html',
})
export class DialogAddLoggerDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogAddLoggerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-remove-logger-dialog',
  templateUrl: 'dialog-remove-logger-dialog.html',
})
export class DialogRemoveLoggerDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogRemoveLoggerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}