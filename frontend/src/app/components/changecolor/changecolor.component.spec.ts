import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangecolorComponent } from './changecolor.component';

describe('ChangecolorComponent', () => {
  let component: ChangecolorComponent;
  let fixture: ComponentFixture<ChangecolorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangecolorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangecolorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
