import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { } from '@types/googlemaps';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { Geocode } from '../map/map.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {

  displayedColumns = ['loggerId', 'loggerName', 'location'];
  loggerDatabase = new LoggerDatabase(this.dataAPI);
  dataSource: LoggerDataSource | null;

  constructor(private dataAPI: DataService) { }

  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.dataAPI.setDatabase(this.loggerDatabase);
    this.dataSource = new LoggerDataSource(this.loggerDatabase);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
  }
}

export interface LoggerData {
  id: string;
  name: string;
  progress: string;
  location: string;
  latlng: any;
  url: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class LoggerDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<LoggerData[]> = new BehaviorSubject<LoggerData[]>([]);
  get data(): LoggerData[] { return this.dataChange.value; }
  private dataAPI;

  constructor(dataAPI: DataService) {
    this.dataAPI = dataAPI;
  }

  /** Adds a new logger to the database. */
  addLogger(name, location, url) {
    Geocode(location).then(result => {
      var latlng = result;
      const copiedData = this.data.slice();
      var logger = this.createNewLogger(name, location, latlng, url);
      copiedData.push(logger);
      this.dataAPI.addLogger(logger);
      this.dataChange.next(copiedData);
    });
  }

  /** Removes a logger from the database. */
  removeLogger(id) {
    var copiedData = this.data.slice();
    copiedData = copiedData.filter(item => item.id != id);
    this.dataAPI.removeLogger(id);
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new Logger. */
  private createNewLogger(name, location, latlng, url) {
    const newName = name;
    const newLocation = location;
    const newLatLng = latlng;
    const newUrl = url

    return {
      id: (this.data.length + 1).toString(),
      name: newName,
      progress: Math.round(Math.random() * 100).toString(),
      location: newLocation,
      latlng: newLatLng,
      url: newUrl
    };
  }
}

export class LoggerDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _loggerDatabase: LoggerDatabase) {
    super();
  }

  connect(): Observable<LoggerData[]> {
    const displayDataChanges = [
      this._loggerDatabase.dataChange,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this._loggerDatabase.data.slice().filter((item: LoggerData) => {
        let searchStr = (item.name + item.location).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    });
  }

  disconnect() {}
}


  