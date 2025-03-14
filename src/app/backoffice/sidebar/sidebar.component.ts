import { Component, OnInit } from '@angular/core';
import { SideBarStatusService } from '../../services/sideBarStatus/side-bar-status.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/auth/token.service';
import { UseStateService } from '../../services/auth/use-state.service';
import { PopupService } from '../../services/utils/popup.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  isActiveParrafo: boolean = false;

  constructor(private sidebarStatusService: SideBarStatusService,
    private useStateService: UseStateService,
    private popupService: PopupService,
    private tokenService: TokenService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.sidebarStatusService.status$.subscribe((status: boolean) => {
      this.isActiveParrafo = status;
    })
  }

  async closeSession(): Promise<void> {
    const confirmed = await this.popupService.showConfirmation(
      "¿Estás seguro?",
      "Se cerrará tu sesión."
    );
  
    if (confirmed) {
      this.popupService.loader("Cerrando sesión", "Espere un momento");
      this.tokenService.removeToken();
      this.useStateService.removeSession();
      setTimeout(() => {
        this.popupService.close();
        this.router.navigate(["/login"]);
      }, 1500);
    }
  }

}
