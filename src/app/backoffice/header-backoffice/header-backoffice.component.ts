import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {TabNotificationComponent} from '../tabs/tab-notification/tab-notification.component';
import {TabAppsComponent} from '../tabs/tab-apps/tab-apps.component';
import {TabPerfilComponent} from '../tabs/tab-perfil/tab-perfil.component';
import {TabAjusteComponent} from '../tabs/tab-ajuste/tab-ajuste.component';
import { SideBarStatusService } from '../../services/sideBarStatus/side-bar-status.service';


@Component({
  selector: 'app-header-backoffice',
  imports: [
    NgIf,
    TabNotificationComponent,
    TabAppsComponent,
    TabPerfilComponent,
    TabAjusteComponent,
  ],
  standalone: true,
  templateUrl: './header-backoffice.component.html',
  styleUrl: './header-backoffice.component.scss'
})
export class HeaderBackofficeComponent {
  isActive: boolean = true;
  
  isActiveItems:any={
  isActiveNotification:false,
  isActiveApps:false,
  isActivePerfil:false,
  isActiveAjueste:false,
  }

  constructor(
    private sidebarStatusService: SideBarStatusService,
  ){}

  toggleLogo() {
    this.isActive = !this.isActive;
    this.sidebarStatusService.changeStatus(this.isActive);
  }
  toggleItems(option:string) {
    if(this.isActiveItems[option]){
      this.isActiveItems[option] = false;
    }else{
    Object.keys(this.isActiveItems).forEach(item => {
      this.isActiveItems[item] = false;
    });
    this.isActiveItems[option] = true;
  }
}

}
