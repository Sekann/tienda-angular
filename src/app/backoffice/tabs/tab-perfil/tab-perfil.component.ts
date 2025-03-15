import { Component } from '@angular/core';
import { CredentialsService } from '../../../services/auth/credentials.service';

@Component({
  selector: 'app-tab-perfil',
  standalone: true,
  imports: [],
  templateUrl: './tab-perfil.component.html',
  styleUrl: './tab-perfil.component.scss'
})
export class TabPerfilComponent {


  constructor(
      private credentialsService: CredentialsService,
    ) { }

  closeSession(): void {
    this.credentialsService.logout(); // Usa la misma función
  }
}
