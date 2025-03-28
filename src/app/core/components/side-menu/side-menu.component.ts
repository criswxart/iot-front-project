import { Component, inject } from '@angular/core';
import { SideMenuOptionsComponent } from './side-menu-options/side-menu-options.component';
import { RouterOutlet } from '@angular/router';
import { SideMenuHeaderComponent } from "./side-menu-header/side-menu-header.component";
import { MenuOption } from '../interface/menu-option.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-side-menu',
  imports: [RouterOutlet, SideMenuHeaderComponent, SideMenuOptionsComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  authService = inject(AuthService);
}
