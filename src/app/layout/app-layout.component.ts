import { Component } from '@angular/core';
import { LayoutService } from './services/app.layout.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.style.scss']
})
export class AppLayoutComponent {
  isNavbarOn!: boolean;
  role!: string;
  constructor(private layoutService: LayoutService, private authService: AuthService) {
    this.layoutService.currentNavbarState.subscribe(
      state => (this.isNavbarOn = state),
    );

    this.role = this.authService.getRole() ?? "";
  }

}
