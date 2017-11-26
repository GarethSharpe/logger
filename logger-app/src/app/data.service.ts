import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { } from '@types/googlemaps';

@Injectable()
export class DataService {

  logger_id: number;

  constructor() { }

  getLoggers():Promise<any> {
    return new Promise((resolve, reject) => {
      this.readDatabase().then((loggers) => {
      resolve(loggers);
      });
    });
  }

  setLogger(logger) {
    firebase.database().ref('/' + logger.id).set({
      id: logger.id,
      name: logger.name,
      progress: logger.progress,
      location: logger.location,
      latlng: logger.latlng,
      url: logger.url
    });
  }

  deleteLogger(id: string) {
    console.log("TODO: deleteLogger()");
  }

  /** Builds and returns a new Logger. */
  createNewLogger(name, location, url):Promise<any> {
    return new Promise((resolve, reject) => {
      const id = this.logger_id++;
      this.Geocode(location).then(latlng => {
      const progress = Math.round(Math.random() * 100).toString();
      const logger = this.readLogger(id, name, progress, location, latlng, url);
      console.log(logger);
      resolve(logger);
      });
    })
  }

  readDatabase():Promise<any> {
    return new Promise((resolve, reject) => {
      var loggers = []; 
      firebase.database().ref('/').once("value").then((loggersSnapshot) => {
        for (var key in loggersSnapshot.val()) {
          var database_logger = loggersSnapshot.val()[key]
          var logger = this.readLogger(
            database_logger.id,
            database_logger.name, 
            database_logger.progess,
            database_logger.location, 
            database_logger.latlng, 
            database_logger.url);
          loggers.push(logger);
        }
        this.logger_id = loggers.length + 1;
        resolve(loggers);
      });
    });
  }

  /** Builds and returns a new Logger. */
  readLogger(id, name, progress, location, latlng, url) {
    return {
      id: id,
      name: name,
      progress: progress,
      location: location,
      latlng: latlng,
      url: url
    };
  }

  Geocode(address: string):Promise<any> {
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

}
