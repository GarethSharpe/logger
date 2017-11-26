import { ElementRef, NgZone, ViewChild, Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl } from '@angular/forms';

function log(val) { console.log(val); }

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  // google maps zoom level
  private zoom: number = 8;
  // initial center position for the map
  private lat: number = 43.433091;
  private lng: number = -80.547753;
  private loggers: Promise<any>;

  constructor(private dataAPI: DataService) { }

  ngOnInit() {
    this.dataAPI.getLoggers().then((loggers) => {
      this.loggers = loggers;
    });
  }
}