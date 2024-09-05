import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it } from 'node:test';
import { CompetencyFrameworkComponent } from './competency-framework.component';


describe('CompetencyFrameworkComponent', () => {
  let component: CompetencyFrameworkComponent;
  let fixture: ComponentFixture<CompetencyFrameworkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyFrameworkComponent]
    });
    fixture = TestBed.createComponent(CompetencyFrameworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
