import {Component, OnInit} from '@angular/core';
import {ChartConfiguration, ChartDataset, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-graphic-tercera-caja',
  imports: [
    BaseChartDirective
  ],
  standalone: true,
  templateUrl: './graphic-tercera-caja.component.html',
  styleUrl: './graphic-tercera-caja.component.scss'
})
export class GraphicTerceraCajaComponent implements OnInit {


  ngOnInit(): void {
    this.setChartData();
  }

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true, // Línea obligatoria
    maintainAspectRatio: false, // Proporción del gráfico
    plugins: {
      legend: { // campo opcional
        display: true,
        position: 'bottom'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
          font: {size: 14, weight: "bolder"}
        }
      },
      y: {
        title: {
          display: true,
          text: "Progress %",
          font: {size: 14, weight: "bolder"}
        },
        ticks: {
          stepSize: 10,
        }
      }
    }
  }

  public lineChartLabels: string[] = []
  public lineChartData: ChartDataset<'line'>[] = [
    {
      data: [],
      label: "Progress",
      backgroundColor: [],
      hoverBackgroundColor: [],
    }
  ];

  public lineChartType: ChartType = 'line';


  private setChartData(): void {
    const data = {
      labels: ["January", "February", "March", "April", "May", "June"],
      values: [10, 25, 40, 35, 35, 65]
    }

    this.lineChartLabels = data.labels;
    this.lineChartData[0].data = data.values
  }


  }
