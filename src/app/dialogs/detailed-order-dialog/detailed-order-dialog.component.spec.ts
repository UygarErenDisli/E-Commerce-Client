import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedOrderDialogComponent } from './detailed-order-dialog.component';

describe('DetailedOrderDialogComponent', () => {
  let component: DetailedOrderDialogComponent;
  let fixture: ComponentFixture<DetailedOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailedOrderDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailedOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
