import { Component, OnInit } from '@angular/core';
import { UseStateService } from '../../services/auth/use-state.service';
import { PopupService } from '../../services/utils/popup.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  products: any[] = [];
  userId: number | null = null;

  newProduct = {
    name: '',
    imageUrl: '',
    description: '',
    price: null,
    tax: null,
    currency: ''
  };

  constructor(
    private productService: ProductService,
    private useStateService: UseStateService,
    private popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.userId = this.useStateService.getUserId();
    if (!this.userId) {
      this.popupService.showMessage("Error", "Usuario no autenticado.", "error");
      return;
    }
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getUserProducts(this.userId!).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: () => {
        this.popupService.showMessage("Error", "No se pudieron cargar los productos.", "error");
      }
    });
  }

  addProduct() {
    if (!this.userId) return;

    this.productService.createProduct(this.userId, this.newProduct).subscribe({
      next: (product) => {
        this.products.push(product);
        this.popupService.showMessage("Éxito", "Producto agregado correctamente.", "success");
        this.newProduct = { name: '', imageUrl: '', description: '', price: null, tax: null, currency: '' };
      },
      error: () => {
        this.popupService.showMessage("Error", "No se pudo agregar el producto.", "error");
      }
    });
  }

  deleteProduct(productId: number) {
    if (!this.userId) return;

    this.productService.deleteProduct(productId, this.userId).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== productId);
        this.popupService.showMessage("Éxito", "Producto eliminado correctamente.", "success");
      },
      error: () => {
        this.popupService.showMessage("Error", "No se pudo eliminar el producto.", "error");
      }
    });
  }
}
