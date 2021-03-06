import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { DataService, LoggerData } from '../data.service';

import * as firebase from "firebase";

import { } from '@types/googlemaps';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

var config = {
    apiKey: "AIzaSyDXI-Ohh33wg_dFezqHV0op7Dg1_AxQOWU",
    authDomain: "logger-gsjj.firebaseapp.com",
    databaseURL: "https://logger-gsjj.firebaseio.com",
    projectId: "logger-gsjj",
    storageBucket: "logger-gsjj.appspot.com",
    messagingSenderId: "134022097913"
  };

firebase.initializeApp(config);

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
    this.dataSource = new LoggerDataSource(this.loggerDatabase);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
    this.loggerDatabase.refreshTable();
  }
}

/* A database that the data source uses to retrieve data for the table. */
export class LoggerDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<LoggerData[]> = new BehaviorSubject<LoggerData[]>([]);
  get data(): LoggerData[] { return this.dataChange.value; }

  constructor(private dataAPI: DataService) { }

  public refreshTable() {
    this.dataAPI.subscribeDataChangeListener(this.dataChange);
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


  