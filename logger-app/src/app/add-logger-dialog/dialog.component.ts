import { Component, Inject, OnInit } from '@angular/core';
import { 
  MatDialog,
  MatDialogRef, 
  MAT_DIALOG_DATA,
  MatSnackBar } from '@angular/material';

import { DataService } from '../data.service';
import * as firebase from "firebase";

@Component({
  selector: 'app-logger-dialog',
  templateUrl: 'dialog.component.html'
})
export class DialogComponent implements OnInit {

  logger: string;
  location: string;
  id: string;
  url: string;

  email: string;
  password: string;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dataAPI: DataService) { }

  ngOnInit() {
    if (firebase.auth().currentUser)
        firebase.auth().signOut();
    let dialogRef = this.dialog.open(DialogLoginDialog, {
      width: '300px',
      data: { email: this.email, password: this.password },
      disableClose: true
    });
  }

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
            this.dataAPI.pushLoggerCache(logger);
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
        this.openSnackBar();
      }
    });
  }

  openSnackBar() {
    this.snackBar.open("Logger Deleted", "Done", {
      duration: 1000,
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

@Component({
  selector: 'dialog-login-dialog',
  templateUrl: 'dialog-login-dialog.html',
})
export class DialogLoginDialog {

  email: string;
  password: string;

  constructor(
    private snackBar: MatSnackBar,
    private dataService: DataService,
    public dialogRef: MatDialogRef<DialogLoginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public openLoginDialog() {
  }

  onLoginClick(data) {
    if (data.email.length < 4) {
      this.snackBar.open("Please enter an email address.", "Done", {
        duration: 3000,
      });
      return;
    }
    if (data.password.length < 4) {
      this.snackBar.open("Please enter a password.", "Done", {
        duration: 3000,
      });
      return;
    }

    firebase.auth().signInWithEmailAndPassword(data.email, data.password).then((result) => {
      this.dialogRef.close();
      const image = <HTMLImageElement> document.getElementsByClassName("user-image")[0];
      image.src = result.photoURL;
      var identity = result.displayName;
      if (!identity)
        identity = result.email;
      this.openSucessSnackBar(identity);
    }).catch((error) => {
      this.openErrorSnackBar(error);
    });
  }

  onChangePasswordClick() {
    this.sendEmailVerification();
  }

  sendEmailVerification() {
    this.openVerificationSnackBar();
    firebase.auth().currentUser.sendEmailVerification();
  }

  openSucessSnackBar(identity) {
    this.snackBar.open("Hi, " + identity + "! Verification succesful.", "Done", {
      duration: 3000,
    });
  }

  openErrorSnackBar(error) {
    if (error.code === 'auth/wrong-password') {
      this.snackBar.open("Wrong password", "Done", {
        duration: 3000,
      });
    } else {
      this.snackBar.open(error.message, "Done", {
        duration: 3000,
      });
    }
  }

  openVerificationSnackBar() {
    this.snackBar.open("Email Verification Sent!", "Done", {
      duration: 3000,
    });
  }

}