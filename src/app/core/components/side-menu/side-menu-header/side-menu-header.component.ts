import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.component.html',
  styleUrl: './side-menu-header.component.css'
})
export class SideMenuHeaderComponent  {

  authService = inject(AuthService);


  

}
