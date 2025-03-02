import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graphic-segunda-caja3',
  imports: [BaseChartDirective],
  templateUrl: './graphic-segunda-caja3.component.html',
  styleUrl: './graphic-segunda-caja3.component.scss'
})
export class GraphicSegundaCaja3Component implements OnInit {

  ngOnInit(): void {
    this.setChartData();
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true, // Línea obligatoria
    maintainAspectRatio: false, // Proporción del gráfico
    plugins: {
      legend: { // campo opcional
        display: true,
        position: 'bottom'
      }
    }
  }

  public barChartLabels: string[] = []
  public barChartData: ChartDataset<'bar'>[] = [
    {
      data: [],
      label: "Ventas",
      backgroundColor: [],
      hoverBackgroundColor: [],
    }
  ];

  public barChartType: ChartType = 'bar';


  private setChartData(): void {
    const data = {
      labels: ["Producto A", "Producto B", "Producto C", "Producto D"],
      values: [10, 20, 15, 5]
    }

    this.barChartLabels = data.labels;
    this.barChartData[0].data = data.values;
  }

}

