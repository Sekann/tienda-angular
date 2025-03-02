import { Component } from '@angular/core';
import { GraphicPrimeraCajaComponent } from '../graphic-primera-caja/graphic-primera-caja.component';
import { GraphicTerceraCajaComponent } from "../graphic-tercera-caja/graphic-tercera-caja.component";
import { GraphicSegundaCajaComponent } from "../graphic-segunda-caja/graphic-segunda-caja.component";
import { GraphicPrimeraCaja3Component } from "../graphic-primera-caja3/graphic-primera-caja3.component";
import { GraphicSegundaCaja3Component } from "../graphic-segunda-caja3/graphic-segunda-caja3.component";
import { GraphicTerceraCaja3Component } from "../graphic-tercera-caja3/graphic-tercera-caja3.component";

@Component({
  selector: 'app-graphics',
  standalone: true,
  imports: [GraphicPrimeraCajaComponent, GraphicTerceraCajaComponent, GraphicSegundaCajaComponent, GraphicPrimeraCaja3Component, GraphicSegundaCaja3Component, GraphicTerceraCaja3Component],
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.scss'
})
export class GraphicsComponent {

}
