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
   private months = ["January", "February", "March", 
                     "April", "May", "June", "July", 
                     "August", "September", "October",
                     "November", "December"];

  constructor(private chartService: ChartService) { }

  ngOnInit() { }

  goHome() {
  	window.open("https://logger-gsjj.firebaseapp.com/", '_blank');
  }

  downloadFile(month) {
    var i = 0;
    while (this.months[i] != month)
      i++;
    var path = "././assets/log-" + (i + 1) + ".csv";
    window.fetch(path).then(response => {
      response.blob().then(fileBlob => {
        console.log(fileBlob);
        saveAs(fileBlob, month + "-log.csv");
      });
    });
  }

  saveAsPng() {
    this.chartService.saveAsPng();
  }

}
