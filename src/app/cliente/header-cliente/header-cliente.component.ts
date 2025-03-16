import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/auth/token.service';
import { CredentialsService } from '../../services/auth/credentials.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header-cliente',
    imports: [FormsModule, CommonModule, ReactiveFormsModule],
  
  templateUrl: './header-cliente.component.html',
  styleUrls: ['./header-cliente.component.scss'],
})
export class HeaderClienteComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(
    private tokenService: TokenService,
    private credentialsService: CredentialsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tokenService.isAuthenticated$.subscribe(status => {
      this.isAuthenticated = status;
    });
  }

  async cerrarSesion(): Promise<void> {
    await this.credentialsService.logout();
    this.router.navigate(['/']); 
  }
}
