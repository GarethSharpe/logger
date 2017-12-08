import { 
    Component, 
    ViewChild, 
    ViewEncapsulation, 
    ElementRef, 
    AfterViewInit } from '@angular/core';
 
import { HttpClient, HttpResponse } from '@angular/common/http';

import { jqxGaugeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxgauge';
import { jqxLinearGaugeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxlineargauge';

import * as firebase from "firebase";

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})

export class GaugeComponent {
	@ViewChild('powerGauge') powerGauge: jqxGaugeComponent; 

    private gauge: any;
    private power: number;

    constructor(private http: HttpClient) { }

    ngAfterViewInit(): void {

        this.powerGauge.width(55);
        this.powerGauge.height(55);
        this.powerGauge.radius(30);

        let timer = setInterval(() => {
            firebase.database().ref('/garethjsharpe@gmail-com/power').once('value').then(snapshot => {
                this.power = snapshot.val();
                this.power = Math.round(this.power * 100) / 100
                this.powerGauge.value(this.power);
            });
        }, 10000)
    }

    ticksMinor: any = { interval: 0.25, size: '5%' };

    ticksMajor: any = { interval: 0.5, size: '9%' };

    powerLabels: any = {
        interval: 1,
    };

    ranges: any[] =
    [
        { startValue: 0, endValue: 2, style: { fill: '#e02629', stroke: '#e02629' }, endWidth: 1, startWidth: 0.5 },
        { startValue: 2, endValue: 3, style: { fill: '#ff8000', stroke: '#ff8000' }, endWidth: 1.5, startWidth: 1 },
        { startValue: 3, endValue: 4, style: { fill: '#fbd109', stroke: '#fbd109' }, endWidth: 2, startWidth: 1.5 },
        { startValue: 4, endValue: 5.5, style: { fill: '#4bb648', stroke: '#4bb648' }, endWidth: 2.5, startWidth: 2 },
        { startValue: 5.5, endValue: 7, style: { fill: '#e02629', stroke: '#e02629' }, endWidth: 3.5, startWidth: 3 }
    ];

    ticksMinorLinear: any = { size: '5%', interval: 2.5, style: { 'stroke-width': 1, stroke: '#aaaaaa' } };

    ticksMajorLinear: any = { size: '10%', interval: 10 };
}
