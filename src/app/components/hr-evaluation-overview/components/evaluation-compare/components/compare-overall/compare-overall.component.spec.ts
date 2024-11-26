import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareOverallComponent } from './compare-overall.component';

describe('CompareOverallComponent', () => {
  let component: CompareOverallComponent;
  let fixture: ComponentFixture<CompareOverallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompareOverallComponent]
    });
    fixture = TestBed.createComponent(CompareOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
