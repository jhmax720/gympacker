import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalSubComponent } from './paypal-sub.component';

describe('PaypalSubComponent', () => {
  let component: PaypalSubComponent;
  let fixture: ComponentFixture<PaypalSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypalSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
