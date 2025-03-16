import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<any[]>(this.getStoredCart());
  cartItems$ = this.cart.asObservable();

  constructor() {}

  addToCart(product: any) {
    let currentCart = this.cart.getValue();
    let existingItem = currentCart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }

    this.cart.next([...currentCart]);
    this.saveCartToLocalStorage(currentCart); // 🔥 Guardar en localStorage
  }

  getCartItems(): Observable<any[]> {
    return this.cartItems$;
  }

  clearCart() {
    this.cart.next([]);
    this.saveCartToLocalStorage([]); 
  }
  removeFromCart(productId: number) {
    let currentCart = this.cart.getValue();
    
    let updatedCart = currentCart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter(item => item.quantity > 0);
  
    this.cart.next([...updatedCart]);
    this.saveCartToLocalStorage(updatedCart); 
  }

  private saveCartToLocalStorage(cart: any[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  private getStoredCart(): any[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
}
