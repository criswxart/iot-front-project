import { Component } from '@angular/core';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  selector: 'app-dashboard',
  imports: [SideMenuComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
