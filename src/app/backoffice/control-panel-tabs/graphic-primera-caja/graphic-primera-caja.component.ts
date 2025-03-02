import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graphic-primera-caja',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './graphic-primera-caja.component.html',
  styleUrl: './graphic-primera-caja.component.scss'
})
export class GraphicPrimeraCajaComponent implements OnInit {

  ngOnInit():void {
    this.setChartData();

  }

    public doughnutChartOptions:ChartConfiguration['options'] ={
      responsive:true,
      maintainAspectRatio:false, // proporcion del grafico
      plugins:{
        legend: {
          display: false,
          position: 'bottom',
        },
        tooltip: {
      
        },
        title: {
          display: true,
        },
      }
    } 

    public doughnutChartLabels:string[] = []
    public doughnutChartData: { labels:string[], datasets:ChartDataset<'doughnut'>[], } ={
      labels: [],	
      datasets: [{
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
          hoverBorderColor: [],
          hoverBorderWidth: [],
      }]
    }
  
    public doughnutChartType:ChartType = 'doughnut';

    private setChartData(): void{
      this.doughnutChartLabels=[
        "label 1",
        "label 2",
        "label 3",
        // traer los datos del backend
      ]
      this.doughnutChartData.labels=[
        "Organic",
        "Refrral",
        "Other",
      ]
      
      this.doughnutChartData.datasets[0].data=[44.46,5.54,50]
      this.doughnutChartData.datasets[0].backgroundColor=["blue", "green", "yellow",]
      this.doughnutChartData.datasets[0].hoverBackgroundColor=["blue", "green", "yellow"]
    }
}
