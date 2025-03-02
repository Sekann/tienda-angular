import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialsService } from '../../services/auth/credentials.service';
import { LoginInterface } from '../../services/interfaces/auth';

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
    private router: Router ) {
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
        console.log(data);
        this.router.navigate(["/app/control-panel"]);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
