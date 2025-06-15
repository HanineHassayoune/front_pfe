import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent,
  NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-column-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.css']
})
export class ColumnChartComponent implements OnChanges {
  @ViewChild("chart") chart!: ChartComponent;

  @Input() statuses: Record<string, number> = {}; // clé = statut, valeur = count

  public chartOptions!: ChartOptions;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['statuses'] && this.statuses) {
      this.initChart();
    }
  }

  private initChart(): void {
    const categories = Object.keys(this.statuses);
    const values = Object.values(this.statuses || {}).map(v => Number(v) || 0);

    this.chartOptions = {
      series: [
        {
          name: 'Tickets',
          data: values
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      title: {
        text: 'Statuts des Tickets'
      },
      xaxis: {
        categories
      }
    };
  }
}
