import { FlavorService, FlavorData } from './../flavor.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { trigger, state, style, animate, transition } from '@angular/animations';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/groupBy';

const VOTE_DELAY = 750;

@Component({
  selector: 'app-ice-cream-table',
  templateUrl: './ice-cream-table.component.html',
  styleUrls: ['./ice-cream-table.component.css'],
  animations: [
    trigger('pulse', [
      state('enabled', style({ background: 'white' })),
      transition('void => enabled', [
        style({ background: 'lightseagreen' }),
        animate('350ms ease-out')
      ]),
    ])
  ]
})
export class IceCreamTableComponent implements OnInit {
  dataSource: FlavorDataSource | null;
  public vote$ = new Subject<any>();
  displayedColumns = ['votes', 'image', 'name', 'like'];
  pulseState = '';
  disabled: { [key: number]: boolean } = {};

  constructor(private service: FlavorService, private ngZone: NgZone) { }

  ngOnInit() {
    // Workaround for https://github.com/angular/material2/issues/5593
    setTimeout(() => {
      this.dataSource = new FlavorDataSource(this.service);
    }, 0);

    // Enable update pulses after 3s, so the initial load doesn't flash.
    // This is run outside the Angular zone so it doesn't block testing.
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        // The callback needs to be run inside the Angular zone so the change
        // is picked up.
        this.ngZone.run(() => this.pulseState = 'enabled');
      }, 3000);
    });

    this.vote$.asObservable().groupBy(s => s).subscribe((value: any) => {
      const id = value.key;
      value.throttleTime(VOTE_DELAY - 250).subscribe(() => {
        this.service.addVote(id);
        this.disabled[id] = true;
      });
    });

    this.vote$.delay(VOTE_DELAY).forEach((id) => {
      this.disabled[id] = false;
    });
  }

  addVote(id: string) {
    this.vote$.next(id);
  }
}

// A DataSource is how we get data into a CDK table.
export class FlavorDataSource extends DataSource<any> {
  constructor(private service: FlavorService) {
    super();
  }

  // The CDK table will call connect and expects an observable of a list
  // of data items to display. An Observable is a reference to a value that
  // can change over time.
  connect(): Observable<FlavorData[]> {
    return this.service.getFlavors();
  }

  disconnect() {
  }
}
