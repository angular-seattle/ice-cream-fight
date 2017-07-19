import { MdTableModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { IceCreamMaterialModule } from './../app.module';
import { async, discardPeriodicTasks, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { IceCreamTableComponent } from './ice-cream-table.component';
import { FlavorService, FlavorData } from './../flavor.service';

import 'rxjs/add/observable/of';

const STATIC_DATA = [
  { 'votes': 20, 'imageUrl': '/assets/americone_dream.jpg', 'name': 'Americone Dream', '$key': 1 },
  { 'votes': 10, 'imageUrl': '/assets/rocky_road.jpg', 'name': 'Rocky Road' }
];

describe('IceCreamTableComponent', () => {
  let component: IceCreamTableComponent;
  let fixture: ComponentFixture<IceCreamTableComponent>;

  const listSub = new Subject<any>();
  const addVoteSpy = jasmine.createSpy('addVote');
  const getFlavorsSpy = jasmine.createSpy('getFlavors').and.callFake(() => {
    return listSub.asObservable();
  });

  const fakeFlavorService: any = {
    getFlavors: getFlavorsSpy,
    addVote: addVoteSpy
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IceCreamTableComponent],
      providers: [
        { provide: FlavorService, useValue: fakeFlavorService }
      ],
      imports: [IceCreamMaterialModule, NoopAnimationsModule, MdTableModule]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    getFlavorsSpy.calls.reset();
    addVoteSpy.calls.reset();
    fixture = TestBed.createComponent(IceCreamTableComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  }));

  it('should display the flavors', fakeAsync(() => {
    listSub.next(STATIC_DATA);
    fixture.detectChanges();
    tick(100);

    const rows = fixture.nativeElement.querySelectorAll('md-row');
    expect(getFlavorsSpy).toHaveBeenCalled();
    expect(rows.length).toEqual(STATIC_DATA.length);
  }));

  it('should rate limit votes', fakeAsync(() => {
    listSub.next(STATIC_DATA);
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('md-row');
    const vote = rows[0].querySelectorAll('button')[0];

    vote.click();
    expect(addVoteSpy).toHaveBeenCalled();
    addVoteSpy.calls.reset();
    tick(100);

    vote.click();
    expect(addVoteSpy).not.toHaveBeenCalled();
    tick(1000);

    vote.click();
    expect(addVoteSpy).toHaveBeenCalled();
    discardPeriodicTasks();
  }));
});
