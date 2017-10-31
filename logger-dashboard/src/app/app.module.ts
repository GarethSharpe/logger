import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { ChartService } from "./chart.service"

import { 
  MatButtonModule, 
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { BannerComponent } from './banner/banner.component';
import { GaugeComponent } from './gauge/gauge.component';
import { jqxChartComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxchart';
import { jqxGaugeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxgauge';
import { jqxLinearGaugeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxlineargauge';

@NgModule({
  declarations: [
      AppComponent, 
      jqxChartComponent,
      jqxGaugeComponent,
      jqxLinearGaugeComponent, 
      ChartComponent, 
      BannerComponent, 
      GaugeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    HttpClientModule
  ],
  providers: [ChartService],
  bootstrap: [AppComponent]
})

export class AppModule { }
