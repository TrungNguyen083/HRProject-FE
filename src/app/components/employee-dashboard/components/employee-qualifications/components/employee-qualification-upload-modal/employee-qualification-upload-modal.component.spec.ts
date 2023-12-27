import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeQualificationUploadModalComponent } from './employee-qualification-upload-modal.component';

describe('EmployeeQualificationUploadModalComponent', () => {
  let component: EmployeeQualificationUploadModalComponent;
  let fixture: ComponentFixture<EmployeeQualificationUploadModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeQualificationUploadModalComponent]
    });
    fixture = TestBed.createComponent(EmployeeQualificationUploadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
