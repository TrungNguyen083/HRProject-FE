import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/shared/message/notification.service';
import { MessageService } from 'primeng/api';
import { Apollo } from 'apollo-angular';
import { LOGIN } from './constants/login.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  @HostBinding('class') hostClass = 'oms-login-host';
  showPassword = false;

  isLoading = false;

  helper = new JwtHelperService();

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private messageService: MessageService,
    private apollo: Apollo,
  ) { }

  signInForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.signInForm.markAllAsTouched();
    const { username, password } = this.signInForm.value;

    const authRequest = {
      username,
      password,
    }

    if (!this.signInForm.valid) {
      this.notificationService.errorNotification('Enter valid form value');
    } else {
      this.isLoading = true;
      this.apollo
        .query({
          query: LOGIN,
          variables: {
            authRequest
          },
        })
        .subscribe(
          (res: any) => {
            if (res.errors?.length) {
              this.isLoading = false;
              this.notificationService.errorNotification('Username or Password is wrong');
              this.signInForm.reset();
            } else {
              const token = res.data.generateToken;
              this.authService.saveToken(token);

              const decodedToken = this.helper.decodeToken(token);
              const role = decodedToken.authorities;
              this.authService.saveRole(role);

              switch (true) {
                case role.includes('ADMIN'):
                  this.router.navigate(['system-admin']);
                  this.notificationService.successNotification('Login Successful');
                  break;
                case role.includes('HR'):
                  this.router.navigate(['dashboard']);
                  this.notificationService.successNotification('Login Successful');
                  break;
                case role.includes('EMPLOYEE'):
                  this.router.navigate(['my-dashboard']);
                  this.notificationService.successNotification('Login Successful');
                  break;
                // Add more cases as needed for other roles
                default:
                  this.router.navigate(['home']); // Default navigation
                  this.notificationService.successNotification('Login Successful');
                  break;
              }
              this.notificationService.successNotification('Login Successful');
              this.isLoading = false;
            }
          }
        );
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }
}
