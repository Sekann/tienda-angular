import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/order/cart.service';
import { PopupService } from '../../services/utils/popup.service';

@Component({
  selector: 'app-tienda',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
})
export class TiendaComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private popupService: PopupService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
      }
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.popupService.showMessage("¡Agregado!",`🛒 ${product.name} añadido al carrito!`,"success"); // 🔥 Mostrar mensaje
  }
}
