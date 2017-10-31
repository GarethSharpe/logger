import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  
  private loggers: any[];

  constructor(private dataAPI: DataService) { }

  ngOnInit() { 
    this.loggers = this.dataAPI.getLoggers()
  }

  onClick(logger) {
    window.open(logger.url, '_blank');
  }

}
