import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/order/cart.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PopupService } from '../../services/utils/popup.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  cartItems: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private fb: FormBuilder, private popupService: PopupService, private router: Router) {}

  ngOnInit() {
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      paymentMethod: ['', Validators.required]
    });

    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
    if (this.cartItems.length === 0) {//Si no hay productos en el carrito, se redirige a la pagina principal
      this.router.navigate(['/']); 
    }
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.total = parseFloat(this.total.toFixed(2));
  }

  async submitOrder() {
    if (!this.checkoutForm.valid) {
      this.popupService.showMessage("Error", "⚠️ Por favor, complete todos los campos del formulario.", "warning");
      return;
    }
  
    const confirm = await this.popupService.showConfirmation(
      "Confirmar Pedido",
      "¿Estás seguro de que deseas finalizar la compra?",
      "Sí, confirmar",
      "Cancelar"
    );
  
    if (confirm) {
      console.log('Orden confirmada:', this.checkoutForm.value, this.cartItems);
      
      this.popupService.showMessage("Éxito", "🎉 ¡Compra realizada con éxito!", "success");
      this.cartService.clearCart();
      this.router.navigate(['/']);
    }
  }
  isInvalid(controlName: string): boolean {
    const control = this.checkoutForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }
}
