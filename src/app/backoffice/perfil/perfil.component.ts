import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  user: any = {};
  editMode: boolean = false;
  passwordChange = {
    oldPassword: '',
    newPassword: ''
  };

  constructor(private userService: UserService) {}

  
  ngOnInit() {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error obteniendo el perfil:', err);
      }
    });
  }

  saveProfile(): void {
    this.userService.updateUserProfile(this.user).subscribe({
      next: () => {
        alert('Perfil actualizado correctamente');
        this.editMode = false;
      },
      error: (error) => {
        console.error('Error al actualizar perfil', error);
      }
    });
  }

  changePassword(): void {
    this.userService.changePassword(this.passwordChange).subscribe({
      next: () => {
        alert('Contraseña cambiada con éxito');
        this.passwordChange = { oldPassword: '', newPassword: '' };
      },
      error: (error) => {
        console.error('Error cambiando la contraseña', error);
      }
    });
  }
}
