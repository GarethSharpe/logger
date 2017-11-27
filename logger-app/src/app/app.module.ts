import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';

import { 
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatTableModule,
  MatInputModule,
  MatDialogModule,
  MatCardModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { SidenavComponent } from './sidenav/sidenav.component'
import { TableComponent } from './table/table.component';
import { MapComponent } from './map/map.component';
import { CardDisplayComponent } from './card-display/card-display.component';
import { 
  DialogComponent, 
  DialogAddLoggerDialog, 
  DialogRemoveLoggerDialog } from './add-logger-dialog/dialog.component';

import { DataService } from './data.service';
import { DialogLoginDialog } from './add-logger-dialog/dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    SidenavComponent,
    TableComponent,
    DialogComponent,
    DialogAddLoggerDialog,
    DialogRemoveLoggerDialog,
    DialogLoginDialog,
    MapComponent,
    CardDisplayComponent
  ],
  imports: [
  AgmCoreModule.forRoot({
      apiKey:'AIzaSyB51QOI_arAytMvWalCNg0Zrvhh-GajrgI',
      libraries: ["places"]
  }),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  entryComponents: [
  DialogAddLoggerDialog,
  DialogRemoveLoggerDialog,
  DialogLoginDialog
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
