import { Component, NgModule, OnInit } from '@angular/core';
import { ProductService } from '../../services/productService/product-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  templateUrl: './productos.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  nuevoProducto: any = { name: '', description: '', price: 0 };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productService.getMyProducts().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al cargar productos', error);
      }
    });
  }

  agregarProducto(): void {
    this.productService.addProduct(this.nuevoProducto).subscribe({
      next: (data) => {
        this.productos.push(data);
        this.nuevoProducto = { name: '', description: '', price: 0 };
      },
      error: (error) => {
        console.error('Error al agregar producto', error);
      }
    });
  }

  eliminarProducto(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.productos = this.productos.filter(p => p.id !== id);
      },
      error: (error) => {
        console.error('Error al eliminar producto', error);
      }
    });
  }
}
