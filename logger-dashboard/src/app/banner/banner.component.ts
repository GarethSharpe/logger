import { Component, OnInit } from '@angular/core';
import { ChartService } from '../chart.service';

import * as JSZip from 'jszip';
import * as firebase from 'firebase';
import * as FBcsv from 'firebase-to-csv';

import { saveAs, writeFile } from 'file-saver/FileSaver';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})

export class BannerComponent implements OnInit {

  private MONTHS = 12;
  private months = ["January", "February", "March", 
                     "April", "May", "June", "July", 
                     "August", "September", "October",
                     "November", "December"];

  constructor(private chartService: ChartService) { }

  ngOnInit() { }

  goHome() {
  	window.open("https://logger-gsjj.firebaseapp.com/", '_blank');
  }

  downloadFile() {
    var now = new Date();
    var thisMonth = this.months[now.getMonth()];
    var dataRef = firebase.database().ref('/garethjsharpe@gmail-com/data').once('value').then(snapshot => {
      const csv = '[' + snapshot.val().slice(1) + ']'
      var blob = new Blob([csv], {type: "text/json"});
      saveAs(blob, thisMonth + "-Log.json");
    });
  }

  saveAsPng() {
    this.chartService.saveAsPng();
  }

}
