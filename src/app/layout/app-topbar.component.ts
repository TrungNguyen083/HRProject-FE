import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from './models/menu.model';
import { LayoutService } from './services/app.layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EmployeeDashboardStore } from '../components/employee-dashboard/store/employee-dashboard-store.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html'
})
export class AppTopbarComponent implements OnInit {
  items!: MenuItem[];
  profileImage!: string;
  routerLink!: string;

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  titles: string | undefined;
  isNavbarOn: boolean | undefined;
  navbarState: boolean | undefined;

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
    private employeeStore: EmployeeDashboardStore,
  ) { }

  ngOnInit() {
    this.layoutService.currentNavbarState.subscribe(
      state => (this.isNavbarOn = state)
    );
    this.titles = this.route.snapshot.data['title'];

    this.getProfileImage();
  }

  private getProfileImage() {
    const email = this.authService.getEmail();
    if (email) this.employeeStore.getProfileImage(email);
    this.employeeStore.profileImage$.subscribe(profileImg => {
      if (!profileImg) return;
      this.profileImage = profileImg;
    });
    if (email) this.employeeStore.getEmployeeId(email);
    this.employeeStore.employeeId$.subscribe(employeeId => {
      this.routerLink = '/employee-management/detail/' + employeeId;
    })
    
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
