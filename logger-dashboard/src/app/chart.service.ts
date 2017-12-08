import { Injectable } from '@angular/core';
import { ChartComponent } from './chart/chart.component';

import * as firebase from "firebase";

@Injectable()
export class ChartService {

  private myChart: any;
  private data: any = [];

  constructor() { }

  setData(data) {
    this.data = data;
  }

  setChart(chart) {
  	this.myChart = chart;
  }

  updateChart() {
  	this.myChart.update();
  }

  refreshChart() {
  	this.myChart.refresh();
  }

  saveAsPng() {
    this.myChart.saveAsPNG('log_chart.png', 'https://www.jqwidgets.com/export_server/export.php');
  }

}
