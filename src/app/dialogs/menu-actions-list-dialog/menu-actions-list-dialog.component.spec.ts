import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuActionsListDialogComponent } from './menu-actions-list-dialog.component';

describe('MenuActionsListDialogComponent', () => {
  let component: MenuActionsListDialogComponent;
  let fixture: ComponentFixture<MenuActionsListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuActionsListDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuActionsListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
