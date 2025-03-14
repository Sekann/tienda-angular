import { Component, NgModule, OnInit } from '@angular/core';
import { ProductService } from '../../services/productService/product-service.service';


@Component({
  selector: 'app-productos',
  standalone: true,
  templateUrl: './productos.component.html',
  imports: [],
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent  {
  

  constructor(private productService: ProductService) {}

}
