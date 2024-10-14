import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencyMatrixComponent } from './competency-matrix.component';

describe('CompetencyMatrixComponent', () => {
  let component: CompetencyMatrixComponent;
  let fixture: ComponentFixture<CompetencyMatrixComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyMatrixComponent]
    });
    fixture = TestBed.createComponent(CompetencyMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
