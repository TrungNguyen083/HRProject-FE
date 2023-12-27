import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCareerPathComponent } from './employee-career-path.component';

describe('EmployeeCareerPathComponent', () => {
  let component: EmployeeCareerPathComponent;
  let fixture: ComponentFixture<EmployeeCareerPathComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeCareerPathComponent]
    });
    fixture = TestBed.createComponent(EmployeeCareerPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
