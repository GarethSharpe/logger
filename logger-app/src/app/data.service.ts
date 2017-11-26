import { Injectable } from '@angular/core';
import * as firebase from "firebase";

@Injectable()
export class DataService {

  private database: any;

  constructor() { }

  setDatabase(database) {
  	this.database = database;
  }

  getDatabase() {
    return this.database;
  }

  getLoggers():Promise<any> {
    return new Promise((resolve, reject) => {
      this.readDatabase().then((loggers) => {
      resolve(loggers);
      });
    });
  }

  addLogger(id, name, progress, location, latlng, url) {
    firebase.database().ref('/' + id).set({
      id: id,
      name: name,
      progress: progress,
      location: location,
      latlng: latlng,
      url: url
    });
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
        resolve(loggers);
      });
    });
  }

  /** Builds and returns a new Logger. */
  private readLogger(id, name, progress, location, latlng, url) {
    return {
      id: id,
      name: name,
      progress: progress,
      location: location,
      latlng: latlng,
      url: url
    };
  }

}
