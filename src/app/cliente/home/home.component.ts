import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularProducts: any[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPopularProducts();
  }

  loadPopularProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.popularProducts = products.slice(0, 4);
      },
      error: (error) => {
        console.error('Error al cargar productos populares:', error);
      }
    });
  }

  goToStore(): void {
    this.router.navigate(['/tienda']);
  }

}
