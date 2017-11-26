import { Component, OnInit } from '@angular/core';
import { DataService, LoggerData } from '../data.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  
  private loggers: LoggerData[];
  private loggerCache: LoggerData[];

  constructor(private dataAPI: DataService) { }

  ngOnInit() { 
    this.loggerCache = this.dataAPI.getLoggerCache();
    this.dataAPI.getLoggers().then((loggers) => {
      this.loggers = loggers;
    });
  }

  onClick(logger) {
    window.open(logger.url, '_blank');
  }
}

