import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerEvaluationFormComponent } from './manager-evaluation-form.component';

describe('ManagerEvaluationFormComponent', () => {
  let component: ManagerEvaluationFormComponent;
  let fixture: ComponentFixture<ManagerEvaluationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerEvaluationFormComponent]
    });
    fixture = TestBed.createComponent(ManagerEvaluationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
