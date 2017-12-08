import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { ChartService } from "./chart.service"

import { 
  MatButtonModule, 
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { BannerComponent } from './banner/banner.component';
import { GaugeComponent } from './gauge/gauge.component';
import { jqxChartComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxchart';
import { jqxGaugeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxgauge';
import { jqxLinearGaugeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxlineargauge';
import { DialogsComponent,
         DialogLoginDialog } from './dialogs/dialogs.component';

@NgModule({
  declarations: [
      AppComponent, 
      jqxChartComponent,
      jqxGaugeComponent,
      jqxLinearGaugeComponent, 
      ChartComponent, 
      BannerComponent, 
      GaugeComponent, 
      DialogsComponent,
      DialogLoginDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule
  ],
  entryComponents: [
    DialogLoginDialog
  ],
  providers: [ChartService],
  bootstrap: [AppComponent]
})

export class AppModule { }
