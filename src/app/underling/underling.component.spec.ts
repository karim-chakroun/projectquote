import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderlingComponent } from './underling.component';

describe('UnderlingComponent', () => {
  let component: UnderlingComponent;
  let fixture: ComponentFixture<UnderlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderlingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
