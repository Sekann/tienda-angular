import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UseStateService } from '../../services/auth/use-state.service';
import { PopupService } from '../../services/utils/popup.service';
import { ProductService } from '../../services/product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  user: any = {};
  editMode: boolean = false;
  roleName: string | null = '';

  passwordForm!: FormGroup;

  constructor(
    private userService: UserService, 
    private useStateService: UseStateService, 
    private popupService: PopupService, 
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        console.log('Perfil :', data);
        this.user = data;
        this.loadUserProducts();
      },
      error: (err) => {
        console.error('Error obteniendo el perfil:', err);
      }
    });

    this.roleName = this.useStateService.getRolename();
    console.log("roleName: ", this.roleName);
    
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(4)]],
      newPassword: ['', [Validators.required,Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required]]
    });
  }


  changePassword(): void {
    if (this.passwordForm.invalid) {
      this.popupService.showMessage("Campos requeridos", "Debes completar todos los campos.", "warning");
      return;
    }

    const { oldPassword, newPassword, confirmPassword } = this.passwordForm.value;

    if (newPassword !== confirmPassword) {
      this.popupService.showMessage("Error", "Las contraseñas no coinciden.", "warning");
      return;
    }

    this.popupService.loader("Procesando...", "Cambiando contraseña");

    this.userService.changePassword(oldPassword, newPassword).subscribe({
      next: () => {
        this.popupService.close();
        this.popupService.showMessage("Éxito", "Contraseña cambiada correctamente.", "success");
        this.passwordForm.reset();
      },
      error: (err) => {
        this.popupService.close();
        this.popupService.showMessage("Error", err.error || "No se pudo cambiar la contraseña.", "error");
      }
    });
  }

  loadUserProducts() {
    const userId = this.useStateService.getUserId();
  
    if (!userId) {
      console.warn("No se pudo cargar los productos porque el ID del usuario es indefinido.");
      return;
    }
  
    this.productService.getUserProducts(userId).subscribe({
      next: (products) => {
        this.user.products = products.slice(0, 3);
      },
      error: (error) => {
        console.error("Error al obtener los productos:", error);
        this.popupService.showMessage("Error", "No se pudieron cargar los productos.", "error");
      }
    });
  }

  goToProducts() {
    this.router.navigate(['/app/productos']);
  }
}
