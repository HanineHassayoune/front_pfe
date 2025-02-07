import { Component } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent {
  getChartOptions() {
    return {
      series: [52.8, 26.8, 20.4],
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
      labels: ["Devops", "Font-end", "Back-end"],
      legend: {
        position: "bottom",
      },
    };
  }

  renderChart() {
    if (document.getElementById("pie-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("pie-chart"), this.getChartOptions());
      chart.render();
    }
  }

  ngAfterViewInit() {
    this.renderChart();
  }

}
