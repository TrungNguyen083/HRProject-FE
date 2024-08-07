import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssginFormComponent } from './user-assign-form.component';

describe('UserAssginFormComponent', () => {
  let component: UserAssginFormComponent;
  let fixture: ComponentFixture<UserAssginFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAssginFormComponent]
    });
    fixture = TestBed.createComponent(UserAssginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
