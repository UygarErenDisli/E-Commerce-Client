import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRoleToUserDialogComponent } from './assign-role-to-user-dialog.component';

describe('AssignRoleToUserDialogComponent', () => {
  let component: AssignRoleToUserDialogComponent;
  let fixture: ComponentFixture<AssignRoleToUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignRoleToUserDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignRoleToUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
