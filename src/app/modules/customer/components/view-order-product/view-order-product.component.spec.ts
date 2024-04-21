import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderProductComponent } from './view-order-product.component';

describe('ViewOrderProductComponent', () => {
  let component: ViewOrderProductComponent;
  let fixture: ComponentFixture<ViewOrderProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOrderProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewOrderProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
