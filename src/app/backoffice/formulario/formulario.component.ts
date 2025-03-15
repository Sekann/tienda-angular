import { Component } from '@angular/core';
import { PopupService } from '../../services/utils/popup.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  imports: [
    FormsModule,

  ],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {
    contact = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };

    constructor(private popupService: PopupService) {}

    sendMessage() {
      if (this.contact.name && this.contact.email && this.contact.subject && this.contact.message) {
        // Mostrar popup de éxito
        this.popupService.showMessage("Enviado", "Tu mensaje ha sido enviado con éxito. ¡Gracias por contactarnos!", "success");

        // Limpiar el formulario
        this.contact = { name: '', email: '', subject: '', message: '' };
      } else {
        // Mostrar popup de advertencia
        this.popupService.showMessage("Error", "Por favor, completa todos los campos antes de enviar.", "warning");
      }
    }
}
