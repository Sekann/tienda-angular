import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CredentialsService } from '../../services/auth/credentials.service';
import { UserInterface } from '../../services/interfaces/auth';
import { PopupService } from '../../services/utils/popup.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
    imports: [
        ReactiveFormsModule
    ],
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {

  registerForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private credentialsService: CredentialsService,
    private popupService: PopupService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      roleName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
    })
  }


  submit() {
    if (this.registerForm.invalid) {
      return;
    }
  
    this.credentialsService.register(this.registerForm.value as UserInterface).subscribe({
      next: (data) => {
        console.log("Registro exitoso:", data);
        
        // Mostrar popup de éxito
        this.popupService.showMessage(
          "Registro Exitoso", 
          "Tu cuenta ha sido creada correctamente. ¡Ya puedes iniciar sesión!", 
          "success"
        );
      },
      error: (err) => {
        console.log("Error en el registro:", err);
  
        // Mostrar popup de error
        this.popupService.showMessage(
          "Error en el Registro", 
          "Hubo un problema al crear tu cuenta. Intenta nuevamente.", 
          "error"
        );
      }
    });
  }
  

}

