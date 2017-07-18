import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

const STATIC_DATA = [
  { 'votes': 20, 'imageUrl': '/assets/americone_dream.jpg', 'name': 'Americone Dream', '$key': 1 },
  { 'votes': 10, 'imageUrl': '/assets/rocky_road.jpg', 'name': 'Rocky Road' }
];

@Component({
  selector: 'app-ice-cream-table',
  templateUrl: './ice-cream-table.component.html',
  styleUrls: ['./ice-cream-table.component.css']
})
export class IceCreamTableComponent implements OnInit {
  dataSource: FlavorDataSource | null;
  displayedColumns = ['votes', 'image', 'name', 'like'];

  constructor() { }

  ngOnInit() {
    // Workaround for https://github.com/angular/material2/issues/5593
    setTimeout(() => {
      this.dataSource = new FlavorDataSource();
    }, 0);
  }

}

export interface FlavorData {
  votes: number;
  imageUrl: string;
  name: string;
}

// A DataSource is how we get data into a CDK table.
export class FlavorDataSource extends DataSource<any> {
  constructor() {
    super();
  }

  // The CDK table will call connect and expects an observable of a list
  // of data items to display. An Observable is a reference to a value that
  // can change over time.
  connect(): Observable<FlavorData[]> {
    return Observable.of(STATIC_DATA);
  }

  disconnect() {
  }
}
