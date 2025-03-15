import { Component } from '@angular/core';
import { GraphicPrimeraCajaComponent } from '../graphic-primera-caja/graphic-primera-caja.component';
import { GraphicTerceraCajaComponent } from "../graphic-tercera-caja/graphic-tercera-caja.component";
import { GraphicBarraComponent } from '../graphic-barra/graphic-barra/graphic-barra.component';

@Component({
  selector: 'app-graphics',
  standalone: true,
  imports: [GraphicPrimeraCajaComponent, GraphicTerceraCajaComponent,GraphicBarraComponent],
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.scss'
})
export class GraphicsComponent {

}
