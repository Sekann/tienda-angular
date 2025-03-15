import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import 'chart.js/auto';
@Component({
  selector: 'app-graphic-barra',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './graphic-barra.component.html',
  styleUrl: './graphic-barra.component.scss'
})
export class GraphicBarraComponent implements OnInit {

  ngOnInit(): void {
    this.setChartData();
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      tooltip: {},
      title: {
        display: true,
        text: 'Data Comparison',
        font: { size: 16, weight: 'bold' }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Meses",
          font: { size: 14, weight: "bold" }
        }
      },
      y: {
        title: {
          display: true,
          text: "sales",
          font: { size: 14, weight: "bold" }
        },
        ticks: {
          stepSize: 10,
        }
      }
    }
  };

  public barChartLabels: string[] = [];
  public barChartData: { labels: string[], datasets: ChartDataset<'bar'>[] } = {
    labels: [],
    datasets: [{
      data: [],
      label: "Progress",
      backgroundColor: [],
      hoverBackgroundColor: [],
    }]
  };

  public barChartType: ChartType = 'bar';

  private setChartData(): void {
    this.barChartLabels = ["January", "February", "March", "April", "May", "June"];
    this.barChartData.labels = ["January", "February", "March", "April", "May", "June"];
    this.barChartData.datasets[0].data = [50, 80, 40, 90, 60, 70];
    this.barChartData.datasets[0].backgroundColor = ["red", "blue", "green", "purple", "orange", "cyan"];
    this.barChartData.datasets[0].hoverBackgroundColor = ["darkred", "darkblue", "darkgreen", "darkpurple", "darkorange", "darkcyan"];
  }

}
