import { Component, OnInit } from '@angular/core';
import { DataService, LoggerData } from '../data.service';
import * as firebase from "firebase";

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  
  private loggers: LoggerData[];
  private loggerCache: LoggerData[];

  constructor(
    private snackBar: MatSnackBar,
    private dataAPI: DataService) { }

  ngOnInit() { 
    this.dataAPI.getLoggers().then((loggers) => {
      this.loggers = loggers;
    });
    this.loggerCache = this.dataAPI.getLoggerCache();
  }

  onClick(logger) {
    window.open(logger.url, '_blank');
  }

  onSignOutClick() {
    firebase.auth().signOut().then(() => {
      window.location.reload();
      console.log("signOut()");
    });
  }

  onChangePasswordClick() {
    this.sendEmailVerification();
  }

  sendEmailVerification() {
    this.openVerificationSnackBar();
    firebase.auth().currentUser.sendEmailVerification();
  }

  openVerificationSnackBar() {
    this.snackBar.open("Email Verification Sent!", "Done", {
      duration: 3000,
    });
  }

}
