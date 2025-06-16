import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-radial-chart',
  standalone: true,
  imports: [],
  templateUrl: './radial-chart.component.html',
  styleUrls: ['./radial-chart.component.css'],
})
export class RadialChartComponent implements OnChanges {

  @Input() series: number[] = [];
  @Input() labels: string[] = [];
  @Input() colors: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.series.length && this.labels.length && this.colors.length) {
      this.renderChart();
    }
  }

  private getChartOptions() {
    return {
      series: this.series,
      labels: this.labels,
      colors: this.colors,
      chart: {
        height: "350px",
        width: "100%",
        type: "radialBar",
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          track: { background: '#E5E7EB' },
          dataLabels: { show: false },
          hollow: { margin: 0, size: "32%" },
        },
      },
      grid: {
        show: false,
        padding: { left: 2, right: 2, top: -23, bottom: -20 },
      },
      legend: {
        show: true,
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      tooltip: {
        enabled: true,
        x: { show: false },
      },
      yaxis: {
        show: false,
        labels: {
          formatter: (value: number) => value + '%',
        },
      },
    };
  }

  private renderChart(): void {
    const chartElement = document.getElementById("radial-chart");
    if (chartElement && typeof ApexCharts !== 'undefined') {
      chartElement.innerHTML = ''; // reset
      const chart = new ApexCharts(chartElement, this.getChartOptions());
      chart.render();
    }
  }
}
