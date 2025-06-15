import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnChanges {
  @Input() categoriesData: { [category: string]: number } = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoriesData'] && this.categoriesData) {
      this.renderChart();
    }
  }

  getChartOptions() {
    const labels = Object.keys(this.categoriesData);
    const series = Object.values(this.categoriesData);

    return {
      series,
      labels,
      colors: ["#1C64F2", "#16BDCA", "#9061F9"],
      chart: {
        height: "300",
        width: "100%",
        type: "pie",
      },
      stroke: {
        colors: ["white"],
      },
      plotOptions: {
        pie: {
          size: "100%",
          dataLabels: {
            offset: -25
          }
        },
      },
      legend: {
        position: "bottom",
      },
    };
  }

  renderChart() {
    const chartElement = document.getElementById("pie-chart");
    if (chartElement && typeof ApexCharts !== 'undefined') {
      chartElement.innerHTML = ""; // reset if re-render
      const chart = new ApexCharts(chartElement, this.getChartOptions());
      chart.render();
    }
  }
}
