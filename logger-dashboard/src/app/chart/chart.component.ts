import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { jqxChartComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxchart';
import { Observable } from 'rxjs/Rx';
import { ChartService } from "../chart.service";

import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyCeo_fnHfA_UXzgIQqnIqKeOVJqK2D2dik",
    authDomain: "logger-dashboard.firebaseapp.com",
    databaseURL: "https://logger-dashboard.firebaseio.com",
    projectId: "logger-dashboard",
    storageBucket: "logger-dashboard.appspot.com",
    messagingSenderId: "520818614985"
  };

firebase.initializeApp(config);

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})

export class ChartComponent {
    @ViewChild('myChart') myChart: jqxChartComponent;

    data = [];

    constructor(private chartService: ChartService) { } 

    ngAfterViewInit() {
        this.chartService.setChart(this.myChart);
        var dataRef = firebase.database().ref('/garethjsharpe@gmail-com/data').limitToLast(180);
        dataRef.once('value').then(snapshot => {
            // firebase.database().ref('/garethjsharpe@gmail-com').child('data').remove();
            snapshot.forEach(loggerSnapshot => {
                var database_data = JSON.parse(loggerSnapshot.val());
                this.data.push(database_data);
            });
            console.log(this.data);
        });
        this.myChart.refresh(); 

        let timer = setInterval(() => {
            firebase.database().ref('/garethjsharpe@gmail-com/current').once('value').then(snapshot => {
                if (this.data.length >= 175)
                    this.data.shift()
                this.data.push(JSON.parse(snapshot.val()));
                this.myChart.refresh();
            });
        }, 10000);
    }

    xAxis: any =
    {
        dataField: 'date',
        displayText: 'Time',
        type: 'date',
        baseUnit: 'minute',
        valuesOnTicks: true,
        tickMarks: {
            visible: true,
            interval: 10,
            color: '#BCBCBC'
        },
        unitInterval: 10,
        formatFunction: (value: any) => {
            return jqx.dataFormat.formatdate(value, 'hh:mm:ss', 'en-us');
        },
        gridLines: {
            visible: false,
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
        tickMarks: { color: '#BCBCBC' },
        axisSize: 'auto'
    };
    
    seriesGroups: any[] =
    [
        {
            type: 'spline',
            lineWidth: 0.5,
            series: [
                { dataField: 'temperature', displayText: 'Temperature' },
                { dataField: 'humidity', displayText: 'Humidity' },
                { dataField: 'light', displayText: 'Light' },
                { dataField: 'pressure', displayText: 'Pressure' },
                { dataField: 'flow', displayText: 'Flow' },
            ]
        }
    ];
}