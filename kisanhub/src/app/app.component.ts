import { Component, OnInit } from '@angular/core';
import { DataSourceService } from './data-source.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public showChartFlag = false;
  public chartData;
  public chartOptions = {
    responsive: true
  };
  public chartLabels;

  constructor(private dataSourceService: DataSourceService) { }

  ngOnInit() {

    this.getDataFromService();
  }
  title = 'kisanhub';
  selectedCountry: string;
  Country = [
    { name: 'UK' },
    { name: 'England' },
    { name: 'Scotland' },
    { name: 'Wales' },
  ];


  selectedWhether: string;
  Whether = [
    { name: 'Tmax' },
    { name: 'Tmin' },
    { name: 'Rainfall' }
  ];

  changeCountry(cntry) {
    if (cntry) {
      this.dataSourceService.getCountry(cntry);
    }
  }

  changeWhether(whthr) {
    if (whthr) {
      this.dataSourceService.getWhether(whthr);
    }
  }

  record: any;
  year: any;
  month: any;
  getDataFromService() {
    this.dataSourceService.dataSource.subscribe((response) => {
      this.record = JSON.parse(JSON.stringify(response));
      this.year = _.uniqBy(this.record, 'year');
      this.month = _.uniqBy(this.record, 'month');
    })
  }

  month1: any;
  month2: any;
  year1: any;
  year2: any;
  changeMonth1(month1) {
    this.chartLabels = [];
    this.data = [];
    this.month1 = month1;
    this.showChart();
  }
  changeYear1(year1) {
    this.chartLabels.length = 0;
    this.data = [];
    this.year1 = year1;
    this.showChart();
  }
  changeMonth2(month2) {
    this.chartLabels.length = 0;
    this.data = [];
    this.month2 = month2;
    this.showChart();
  }
  changeYear2(year2) {
    this.chartLabels.length = 0;
    this.data = [];

    this.year2 = year2;
    this.showChart();
  }

  public data = [];
  showChart() {
    this.showChartFlag = false;
    if (this.month1 != null && this.year1 != null && this.month2 != null && this.year2 != null) {
      if (this.year1 > this.year2) {
        let temp;
        temp = this.month1;
        this.month1 = this.month2;
        this.month2 = temp;

        temp = this.year1;
        this.year1 = this.year2;
        this.year2 = temp;
      }

      let dates = [];
      this.record.forEach(element => {
        
        if (element.month >= this.month1 && element.year == this.year1) {
          this.chartLabels.push(element.month + "-" + element.year);
          this.data.push(element.value);
        }
        if (element.month <= 12 && element.year < this.year2 && element.year > this.year1) {
          this.chartLabels.push(element.month + "-" + element.year);
          this.data.push(element.value);
        }
        if (element.month <= this.month2 && element.year == this.year2) {
          this.chartLabels.push(element.month + "-" + element.year);
          this.data.push(element.value);
        }        
      });

      this.chartData = [
        { data: this.data, label: 'Monthly Weather' },
      ];
     
      this.showChartFlag = true;
    }
  }
}
