import { Component, OnInit } from '@angular/core';
import { SideBarStatusService } from '../../services/sideBarStatus/side-bar-status.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  isActiveParrafo: boolean = true;

  constructor(private sidebarStatusService: SideBarStatusService) { }

  ngOnInit(): void {
    this.sidebarStatusService.status$.subscribe((status: boolean) => {
      this.isActiveParrafo = status;
    })
  }

}
