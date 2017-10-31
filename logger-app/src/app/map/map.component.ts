import { ElementRef, NgZone, ViewChild, Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
// import { getDatabase } from '../table/table.component';
import { DataService } from '../data.service';

import { } from '@types/googlemaps';

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
  public loggers: any[];

  constructor(private dataAPI: DataService) { }

  ngOnInit() {
    this.loggers = this.dataAPI.getLoggers();
    console.log(this.loggers);
  }

}

export function Geocode(address: string):Promise<any> {
    return new Promise((resolve, reject) => {
      var lat: number;
      var lng: number;
      var geocoder = new google.maps.Geocoder();
      // create new geocoder
      var geocoder = new google.maps.Geocoder();
      // get address from {lat, lng}
      geocoder.geocode({'address': address}, function(results, status) {
        if (status[0] == 'O') {
          // console.log(results);
          lat = results[0].geometry.location.lat();
          lng = results[0].geometry.location.lng();
          var latlng = {lat, lng};
        } else {
          console.log("Error");
        }
        resolve(latlng);
      });
    })
  }