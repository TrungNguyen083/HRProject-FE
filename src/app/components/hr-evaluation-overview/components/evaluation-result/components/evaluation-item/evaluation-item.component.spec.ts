import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationItemComponent } from './evaluation-item.component';

describe('EvaluationItemComponent', () => {
  let component: EvaluationItemComponent;
  let fixture: ComponentFixture<EvaluationItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationItemComponent]
    });
    fixture = TestBed.createComponent(EvaluationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
