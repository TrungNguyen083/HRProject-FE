import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencyCreateFormComponent } from './competency-create-form.component';

describe('CompetencyCreateFormComponent', () => {
  let component: CompetencyCreateFormComponent;
  let fixture: ComponentFixture<CompetencyCreateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyCreateFormComponent]
    });
    fixture = TestBed.createComponent(CompetencyCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
