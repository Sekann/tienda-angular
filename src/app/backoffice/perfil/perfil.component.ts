import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UseStateService } from '../../services/auth/use-state.service';
import { PopupService } from '../../services/utils/popup.service';

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
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        console.log('Perfil :', data);
        this.user = data;
      },
      error: (err) => {
        console.error('Error obteniendo el perfil:', err);
      }
    });

    this.roleName = this.useStateService.getRolename();
    console.log("roleName: ", this.roleName);

    // 🔹 Asegurar que el FormGroup esté inicializado correctamente
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(4)]],
      newPassword: ['', [Validators.required,Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  saveProfile(): void {
    this.userService.updateUserProfile(this.user).subscribe({
      next: () => {
        this.popupService.showMessage("✅ Éxito", "Perfil actualizado correctamente", "success");
        this.editMode = false;
      },
      error: (error) => {
        console.error('Error al actualizar perfil', error);
      }
    });
  }

  changePassword(): void {
    if (this.passwordForm.invalid) {
      this.popupService.showMessage("⚠️ Campos requeridos", "Debes completar todos los campos.", "warning");
      return;
    }

    const { oldPassword, newPassword, confirmPassword } = this.passwordForm.value;

    if (newPassword !== confirmPassword) {
      this.popupService.showMessage("⚠️ Error", "Las contraseñas no coinciden.", "warning");
      return;
    }

    this.popupService.loader("Procesando...", "Cambiando contraseña");

    this.userService.changePassword(oldPassword, newPassword).subscribe({
      next: () => {
        this.popupService.close();
        this.popupService.showMessage("✅ Éxito", "Contraseña cambiada correctamente.", "success");
        this.passwordForm.reset();
      },
      error: (err) => {
        this.popupService.close();
        this.popupService.showMessage("❌ Error", err.error || "No se pudo cambiar la contraseña.", "error");
      }
    });
  }
}
