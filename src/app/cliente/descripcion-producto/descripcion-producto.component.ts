import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupService } from '../../services/utils/popup.service';
import { CartService } from '../../services/order/cart.service';

@Component({
  selector: 'app-descripcion-producto',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterModule ],
  templateUrl: './descripcion-producto.component.html',
  styleUrls: ['./descripcion-producto.component.scss']
})
export class DescripcionProductoComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private popupService: PopupService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe((data) => {
        this.product = data;
      });
    }
  }
  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.popupService.showMessage("Éxito", "🛒 Producto añadido al carrito!", "success");
  }

  
}
