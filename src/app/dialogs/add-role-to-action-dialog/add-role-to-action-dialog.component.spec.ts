import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoleToActionDialogComponent } from './add-role-to-action-dialog.component';

describe('AddRoleToActionDialogComponent', () => {
  let component: AddRoleToActionDialogComponent;
  let fixture: ComponentFixture<AddRoleToActionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRoleToActionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRoleToActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
