import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from './models/menu.model';
import { LayoutService } from './services/app.layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html'
})
export class AppTopbarComponent implements OnInit {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  titles: string | undefined;
  isNavbarOn: boolean | undefined;
  navbarState: boolean | undefined;

  routerLink = '/user/detail';

  user = {
    avatar: '',
    dob: '',
    gender: '',
    fullAddress: '',
    email: '',
    fullName: '',
    phoneNumber: '',
  };

  constructor(
    private authService: AuthService,
    public layoutService: LayoutService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.layoutService.currentNavbarState.subscribe(
      state => (this.isNavbarOn = state)
    );
    this.titles = this.route.snapshot.data['title'];

    this.initUser();
  }

  initUser(): void {
    // this.userService
    //   .getUser()
    //   .pipe(
    //     tap(res => {
    //       let { userDetail: user } = res;

    //       user = this.userService.refactorUser(user);

    //       this.user = user;
    //     })
    //   )
    //   .subscribe();
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
