import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialsService } from '../../services/auth/credentials.service';
import { LoginInterface } from '../../services/interfaces/auth';
import { TokenService } from '../../services/auth/token.service';
import { UseStateService } from '../../services/auth/use-state.service';
import { PopupService } from '../../services/utils/popup.service';

@Component({
  selector: 'app-login',
  imports: [ FormsModule,ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private credentialsService: CredentialsService,
    private tokenService: TokenService,
    private router: Router,
    private useStateService: UseStateService,
    private popupService: PopupService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.credentialsService.login(this.loginForm.value as LoginInterface).subscribe({
      next: (data) => {
        this.popupService.loader("Cargando...", "Iniciando sesión");
        setTimeout(()=>{
        this.tokenService.saveToken(data.token, "13214324123");
        this.useStateService.save(data.username, data.roleName);
        this.popupService.close();  
        this.router.navigate(["/app/control-panel"]);
      },1500)
    },
      error: (err) => {
        let message;
        if(err.error== "Invalid password"){
          message="La contraseña es incorrecta";
        }else if(err.error== "User not found"){
          message="El usuario no existe";
        }else{
          message=err.error;
        }
        this.popupService.showMessage("Ha ocurrido un error", message, "error");
      }
    })
  }

}
