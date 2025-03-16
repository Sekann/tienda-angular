import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SideBarStatusService } from '../../services/sideBarStatus/side-bar-status.service';
import { CredentialsService } from '../../services/auth/credentials.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  isActiveParrafo: boolean = false;

  constructor(private sidebarStatusService: SideBarStatusService,
    private credentialsService: CredentialsService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.sidebarStatusService.status$.subscribe((status: boolean) => {
      this.isActiveParrafo = status;
      this.cdRef.detectChanges(); // he agregado esta línea ya que angular no me actualizaba bien el sidebar, se veia más ancho y aparecia el texto "menu"
    })
  }

  closeSession(): void {
    this.credentialsService.logout(); 
  }

}
