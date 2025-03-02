import { Component } from '@angular/core';
import { TruncateTextPipe } from '../../../services/pipes/truncate-text.pipe';

@Component({
  selector: 'app-tab-ajuste',
  standalone: true,
  imports: [
    TruncateTextPipe
  ],
  templateUrl: './tab-ajuste.component.html',
  styleUrl: './tab-ajuste.component.scss'
})
export class TabAjusteComponent {

}
