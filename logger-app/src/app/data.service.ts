import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { } from '@types/googlemaps';

export interface LoggerData {
  id: string;
  name: string;
  progress: string;
  location: string;
  latlng: any;
  url: string;
}

@Injectable()
export class DataService {

  loggerId: number;
  loggerCache: LoggerData[] = [];
  dataChange: any;

  get data(): LoggerData[] { return this.dataChange.value; }

  constructor() { }

  subscribeDataChangeListener(dataChange) {
    this.dataChange = dataChange;
  }

  getLoggers():Promise<LoggerData[]> {
    return new Promise((resolve, reject) => {
      this.readDatabase().then((loggers) => {
      resolve(loggers);
      });
    });
  }

  getLoggerCache() {
    return this.loggerCache;
  }

  /** Adds a new logger to the database. */
  setLogger(logger: LoggerData) {
    const copiedData = this.data.slice();
    copiedData.push(logger);
    this.dataChange.next(copiedData);
    firebase.database().ref('/' + logger.id).set({
      id: logger.id,
      name: logger.name,
      progress: logger.progress,
      location: logger.location,
      latlng: logger.latlng,
      url: logger.url
    });
  }

  getLogger(id: string):Promise<LoggerData> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/').once("value").then((loggersSnapshot) => {
        for (var key in loggersSnapshot.val()) {
          var database_logger = loggersSnapshot.val()[key]
          if (database_logger.id == id) {
            const logger = this.readLogger(
              database_logger.id,
              database_logger.name, 
              database_logger.progess,
              database_logger.location, 
              database_logger.latlng, 
              database_logger.url);
            resolve(logger);
          }
        }
      });
    });
  }
 
  pushLoggerCache(logger: LoggerData) {
    this.loggerCache.push(logger);
  }

  /** Removes a logger from the database. */
  deleteLogger(id: string) {
    var copiedData = this.data.slice();
    copiedData = copiedData.filter(item => item.id != id);
    this.dataChange.next(copiedData);
    firebase.database().ref('/').child(id).remove();
    // Also remove from cache
    // var index = this.loggerCache.indexOf(logger, 0);
    // if (index > -1)
    //   this.loggerCache.splice(index, 1);
  }

  /** Builds and returns a new Logger. */
  createNewLogger(name, location, url):Promise<LoggerData> {
    return new Promise((resolve, reject) => {
      const id = this.loggerId++;
      this.Geocode(location).then(latlng => {
      const progress = Math.round(Math.random() * 100).toString();
      const logger = this.readLogger(id, name, progress, location, latlng, url);
      console.log(logger);
      resolve(logger);
      });
    })
  }

  readDatabase():Promise<LoggerData> {
    return new Promise((resolve, reject) => {
      var loggers = []; 
      firebase.database().ref('/').once("value").then((loggersSnapshot) => {
        for (var key in loggersSnapshot.val()) {
          const database_logger = loggersSnapshot.val()[key]
          const logger = this.readLogger(
            database_logger.id,
            database_logger.name, 
            database_logger.progess,
            database_logger.location, 
            database_logger.latlng, 
            database_logger.url);
          loggers.push(logger);
          this.pushLoggerCache(logger);
        }
        this.loggerId = loggers.length + 1;
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


