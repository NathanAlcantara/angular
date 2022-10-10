import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightModeToggleComponent } from './light-mode-toggle.component';

describe('LightModeToggleComponent', () => {
  let component: LightModeToggleComponent;
  let fixture: ComponentFixture<LightModeToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightModeToggleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightModeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
