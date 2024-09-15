import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreControlManagementComponent } from './core-control-management.component';

describe('CoreControlManagementComponent', () => {
  let component: CoreControlManagementComponent;
  let fixture: ComponentFixture<CoreControlManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoreControlManagementComponent]
    });
    fixture = TestBed.createComponent(CoreControlManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
