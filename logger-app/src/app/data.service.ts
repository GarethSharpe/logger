import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  private loggers = []; 
  private database: any;

  constructor() { }

  addLogger(logger) {
  	this.loggers.push(logger);
  }

  removeLogger(id) {
    this.loggers.splice(id - 1, 1);
    console.log(this.loggers);
  }

  getLoggers() {
  	return this.loggers;
  }

  setDatabase(database) {
  	this.database = database;
  }

  getDatabase() {
    return this.database;
  }

}
