import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/order/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PopupService } from '../../services/utils/popup.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService
    , private popupService: PopupService
  ) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  async removeItem(productId: number) {
    const confirm = await this.popupService.showConfirmation(
      "Eliminar Producto",
      "¿Estás seguro de que deseas eliminar este producto del carrito?",
      "Sí, eliminar",
      "Cancelar"
    );
  
    if (confirm) { 
      this.cartService.removeFromCart(productId);
      this.calculateTotal();
    }
  }

  async clearCart() {
    const confirm = await this.popupService.showConfirmation(
      "Vaciar Carrito",
      "¿Estás seguro de que deseas eliminar todos los productos?",
      "Sí, vaciar",
      "Cancelar"
    );
  
    if (confirm) { 
      this.cartService.clearCart();
      this.cartItems = [];
      this.total = 0;
    }
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    this.total = parseFloat(this.total.toFixed(2)); // Redondear a 2 decimales
  }
}
