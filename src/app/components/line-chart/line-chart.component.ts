import { Component, ViewChild } from '@angular/core';
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
  yaxis: ApexYAxis; // <-- add this
};

@Component({
  standalone: true,
  selector: 'app-line-chart',
  imports: [NgApexchartsModule],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: LineChartOptions;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Tickets résolus",
          data: [1, 2, 3, 3, 5, 6, 7]
        }
      ],
      chart: {
        type: "line",
        height: 350
      },
      title: {
        text: "Évolution des tickets résolus par semaine"
      },
      xaxis: {
        categories: ["S1", "S2", "S3", "S4", "S5", "S6", "S7"]
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
}
