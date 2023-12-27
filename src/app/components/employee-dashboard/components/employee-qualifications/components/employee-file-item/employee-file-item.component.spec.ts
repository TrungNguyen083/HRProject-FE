import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFileItemComponent } from './employee-file-item.component';

describe('EmployeeFileItemComponent', () => {
  let component: EmployeeFileItemComponent;
  let fixture: ComponentFixture<EmployeeFileItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeFileItemComponent]
    });
    fixture = TestBed.createComponent(EmployeeFileItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
