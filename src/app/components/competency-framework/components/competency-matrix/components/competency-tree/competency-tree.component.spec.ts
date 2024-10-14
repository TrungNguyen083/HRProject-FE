import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencyTreeComponent } from './competency-tree.component';

describe('CompetencyTreeComponent', () => {
  let component: CompetencyTreeComponent;
  let fixture: ComponentFixture<CompetencyTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyTreeComponent]
    });
    fixture = TestBed.createComponent(CompetencyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
