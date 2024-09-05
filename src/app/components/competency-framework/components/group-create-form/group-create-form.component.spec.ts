import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCreateFormComponent } from './group-create-form.component';

describe('GroupCreateFormComponent', () => {
  let component: GroupCreateFormComponent;
  let fixture: ComponentFixture<GroupCreateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupCreateFormComponent]
    });
    fixture = TestBed.createComponent(GroupCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
