/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ArcElement, CategoryScale, Chart, DoughnutController, Legend, LinearScale, LineController, LineElement, PieController, PointElement, Title, Tooltip} from 'chart.js';



bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

 //linea de configuracion de graficos
  Chart.register(ArcElement, PieController, DoughnutController, Legend, Tooltip,LineController, LineElement, PointElement, LinearScale, CategoryScale, Title);