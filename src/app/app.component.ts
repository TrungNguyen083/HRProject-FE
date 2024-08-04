import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavigationStart, Router } from '@angular/router';
import { NotificationService } from './shared/message/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'hrms';
  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (!this.authService.isLoggedIn() && event.url !== '/login' && event.url !== '/register') {
          this.router.navigate(['/login']).then(() => {
            this.notificationService.errorNotification('User is not logged in');
          });
        }
      }
    });
  }
}
