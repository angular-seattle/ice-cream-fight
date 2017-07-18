import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IceCreamTableComponent } from './ice-cream-table.component';

describe('IceCreamTableComponent', () => {
  let component: IceCreamTableComponent;
  let fixture: ComponentFixture<IceCreamTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IceCreamTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IceCreamTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
