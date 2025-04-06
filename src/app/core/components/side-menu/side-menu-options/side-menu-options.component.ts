import { Component } from '@angular/core';
import { MenuOption } from '../../interface/menu-option.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
  styleUrl: './side-menu-options.component.css'
})
export class SideMenuOptionsComponent {
  activeRoute: string = '';
  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-table-columns',
      label: 'Dashboard',
      subLabel:'View Dashboard',
      route: '/dashboard/data'
    },
    {
      icon: 'fa-solid fa-building',
      label: 'Company',
      subLabel: 'Company Data',
      route: '/dashboard/company'
    },
    {
      icon: 'fa-solid fa-location',
      label: 'Location',
      subLabel: 'Location Data',
      route: '/dashboard/location'
    },
    {
      icon: 'fa-solid fa-microchip',
      label: 'Sensor',
      subLabel:'Data Sensor',
      route: '/dashboard/sensor'
    },
    {
      icon: 'fa-solid fa-gear',
      label: 'Settings',
      subLabel:'Personal Settings',
      route: '/dashboard/setting'
    }

  ]
}
