import { 
    Component, 
    ViewChild, 
    ViewEncapsulation, 
    ElementRef, 
    AfterViewInit } from '@angular/core';
 
import { HttpClient, HttpResponse } from '@angular/common/http';

import { jqxGaugeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxgauge';
import { jqxLinearGaugeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxlineargauge';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})

export class GaugeComponent {
	@ViewChild('powerGauge') powerGauge: jqxGaugeComponent; 
    // @ViewChild('myLinearTempGauge') myLinearTempGauge: jqxLinearGaugeComponent;
    // @ViewChild('myLinearPressureGauge') myLinearPressureGauge: jqxLinearGaugeComponent;
    // @ViewChild('myLinearFlowGauge') myLinearFlowGauge: jqxLinearGaugeComponent;
    // @ViewChild('gaugeValue') gaugeValue: ElementRef;

    private gauge: any;
    // private temperature: any;
    // private flow: any;
    // private pressure: any;

    constructor(private http: HttpClient) { }

    ngAfterViewInit(): void {

        this.powerGauge.width(55);
        this.powerGauge.height(55);
        this.powerGauge.radius(30);

        this.http.get("./assets/gauge.txt", {responseType: 'text'}).subscribe(data => { 
            this.gauge = Number(data)
            // console.log(this.gauge)
            this.powerGauge.value(this.gauge);
        });

        // this.http.get("./assets/flow.txt", {responseType: 'text'}).subscribe(data => { 
        //     this.flow = Number(data)
        //     this.myLinearFlowGauge.value(this.flow);
        // });

        // this.http.get("./assets/pressure.txt", {responseType: 'text'}).subscribe(data => { 
        //     this.pressure = Number(data)
        //     this.myLinearPressureGauge.value(this.pressure);
        // });

        // this.http.get("./assets/temperature.txt", {responseType: 'text'}).subscribe(data => { 
        //     this.temperature = Number(data)
        //     this.myLinearTempGauge.value(this.temperature);
        // });
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

//     labels: any = {
//         interval: 20,
//         formatValue: (value: number, position: string): string => {
//             if (position === 'far') {
//                 value = (9 / 5) * value + 32;
//                 if (value === -76) {
//                     return 'F';
//                 }
//                 return value + '';
//             }
//             if (value === -60) {
//                 return 'C';
//             }
//             return value + '';
//         }
//     };

// rangesLinear: any[] = [
//         { startValue: -10, endValue: 10, style: { fill: '#FFF157', stroke: '#FFF157' } },
//         { startValue: 10, endValue: 35, style: { fill: '#FFA200', stroke: '#FFA200' } },
//         { startValue: 35, endValue: 60, style: { fill: '#FF4800', stroke: '#FF4800' } }
//     ];

    // onValueChanging(event: any): void {
    //     this.gaugeValue.nativeElement.innerHTML = Math.round(event.args.value) + ' kph';
    // }
}
