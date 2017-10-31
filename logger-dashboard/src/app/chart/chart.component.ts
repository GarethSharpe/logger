import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { jqxChartComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxchart';
import { Observable } from 'rxjs/Rx';
import { ChartService } from "../chart.service";

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})

export class ChartComponent {
    @ViewChild('myChart') myChart: jqxChartComponent;

    constructor(private chartService: ChartService) { } 

    source: any =
    {
        datatype: "csv",
        datafields: [
            { name: 'Time Stamp' },
            { name: 'Temperature' },
            { name: 'Humidity' },
            { name: 'Light' },
            { name: 'Pressure' },
            { name: 'Flow' }
        ],
        url: './assets/log.csv'
    };
 
    dataAdapter: any = new jqx.dataAdapter(this.source, { async: false, autoBind: true, loadError: (xhr, status, error) => { alert('Error loading "' + this.source.url + '" : ' + error); } });

    ngAfterViewInit() {
        this.chartService.setChart(this.myChart);
    }

    xAxis: any =
    {
        dataField: 'Time Stamp',
        type: 'date',
        baseUnit: 'second',
        valuesOnTicks: true,
        tickMarks: {
            visible: true,
            interval: 1,
            color: '#BCBCBC'
        },
        unitInterval: 100,
        formatFunction: (value: any) => {
            return jqx.dataFormat.formatdate(value, 'hh:mm:ss', 'en-us');
        },
        gridLines: {
            visible: true,
            interval: 3,
            color: '#BCBCBC'
        },
        labels: {
            angle: -45,
            rotationPoint: 'topright',
            offset: { x: 0, y: -25 }
        }
    };
 
    valueAxis: any =
    {
        visible: true,
        title: { text: 'Current Value<br>' },
        tickMarks: { color: '#BCBCBC' }
    };
    
    seriesGroups: any[] =
    [
        {
            type: 'line',
            lineWidth: 2,
            series: [
                { dataField: 'Temperature', displayText: 'Temperature' },
                { dataField: 'Humidity', displayText: 'Humidity' },
                { dataField: 'Light', displayText: 'Light' },
                { dataField: 'Pressure', displayText: 'Pressure' },
                { dataField: 'Flow', displayText: 'Flow' },
            ]
        }
    ];
}