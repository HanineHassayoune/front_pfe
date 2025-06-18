import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexStroke,
  ApexYAxis,
  ChartComponent,
  NgApexchartsModule
} from "ng-apexcharts";

export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  yaxis: ApexYAxis;
};

@Component({
  standalone: true,
  selector: 'app-line-chart',
  imports: [NgApexchartsModule],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnChanges {
  @ViewChild("chart") chart: ChartComponent | undefined;

  @Input() dataByDate: Record<string, number> = {};

  public chartOptions: LineChartOptions;

  constructor() {
    // initialisation vide par défaut
    this.chartOptions = {
      series: [
        {
          name: "Tickets Created Daily",
          data: []
        }
      ],
      chart: {
        type: "line",
        height: 350
      },
      title: {
        text: "Tickets Created Per Day"
      },
      xaxis: {
        categories: []
      },
      stroke: {
        curve: "smooth"
      },
      yaxis: {
        labels: {
          formatter: (val: number) => val.toString()
        }
      }
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataByDate'] && this.dataByDate) {
      const dates = Object.keys(this.dataByDate).sort();
      const counts = dates.map(date => this.dataByDate[date]);

      this.chartOptions = {
        ...this.chartOptions,
        series: [{
          name: "Tickets Created Daily",
          data: counts
        }],
        xaxis: {
          categories: dates
        }
      };
    }
  }
}
