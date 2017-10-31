import { Injectable } from '@angular/core';

import { ChartComponent } from './chart/chart.component';

@Injectable()
export class ChartService {

  private myChart: any;

  constructor() { }

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
