import { Component } from '@angular/core';
import {HeaderBackofficeComponent} from '../header-backoffice/header-backoffice.component';
import {RouterOutlet} from '@angular/router';

import { OnInit } from '@angular/core';
import { SideBarStatusService } from '../../services/sideBarStatus/side-bar-status.service';
import { SidebarComponent } from "../sidebar/sidebar.component";


@Component({
  selector: 'app-layout',
  imports: [
    HeaderBackofficeComponent,
    RouterOutlet,
    SidebarComponent
],
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutBackComponent implements OnInit {
  isActiveSidebar: boolean = true;
  constructor(
    private sidebarStatusService: SideBarStatusService,
  ) { }
  ngOnInit(): void {
    this.sidebarStatusService.status$.subscribe((status: boolean) => {
      this.isActiveSidebar = status
    })
  }
}
