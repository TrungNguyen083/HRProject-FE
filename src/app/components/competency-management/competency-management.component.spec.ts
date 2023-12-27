import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencyManagementComponent } from './competency-management.component';

describe('CompetencyManagementComponent', () => {
  let component: CompetencyManagementComponent;
  let fixture: ComponentFixture<CompetencyManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyManagementComponent]
    });
    fixture = TestBed.createComponent(CompetencyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
