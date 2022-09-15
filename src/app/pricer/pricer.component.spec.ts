import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricerComponent } from './pricer.component';

describe('PricerComponent', () => {
  let component: PricerComponent;
  let fixture: ComponentFixture<PricerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
