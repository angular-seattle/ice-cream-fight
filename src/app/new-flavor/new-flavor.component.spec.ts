import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFlavorComponent } from './new-flavor.component';

describe('NewFlavorComponent', () => {
  let component: NewFlavorComponent;
  let fixture: ComponentFixture<NewFlavorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFlavorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFlavorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
