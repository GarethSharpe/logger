import { Component, OnInit } from '@angular/core';
import { ChartService } from "../chart.service";
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})

export class BannerComponent implements OnInit {

   private MONTHS = 12;

  constructor(private chartService: ChartService) { }

  ngOnInit() { }

  goHome() {
  	window.open("https://logger-gsjj.firebaseapp.com/", '_blank');
  }

  downloadFile() {
    var path = "././assets/log.csv";
    window.fetch(path).then(response => {
      response.blob().then(fileBlob => {
        console.log(fileBlob);
        saveAs(fileBlob, "log.csv");
      })
    })
  }

  downloadFolder() {
    this.getFileBlobs();
  }

  getFileBlobs() {
    for (var i = 1; i < this.MONTHS; i++) {
      var name = "log-" + i.toString() + ".csv";
      var path = "././assets/" + name;
      window.fetch(path).then(response => {
        response.blob().then(fileBlob => {
          //console.log(fileBlob);
          saveAs(fileBlob, name);
        });
      });
    }
  }

  saveAsPng() {
    this.chartService.saveAsPng();
  }

}
