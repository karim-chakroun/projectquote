import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTickersComponent } from './update-tickers.component';

describe('UpdateTickersComponent', () => {
  let component: UpdateTickersComponent;
  let fixture: ComponentFixture<UpdateTickersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTickersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTickersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
