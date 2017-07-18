import { FlavorService, FlavorData } from './../flavor.service';
import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

@Component({
  selector: 'app-ice-cream-table',
  templateUrl: './ice-cream-table.component.html',
  styleUrls: ['./ice-cream-table.component.css']
})
export class IceCreamTableComponent implements OnInit {
  dataSource: FlavorDataSource | null;
  displayedColumns = ['votes', 'image', 'name', 'like'];

  constructor(private service: FlavorService) { }

  ngOnInit() {
    // Workaround for https://github.com/angular/material2/issues/5593
    setTimeout(() => {
      this.dataSource = new FlavorDataSource(this.service);
    }, 0);
  }

  addVote(id: string) {
    this.service.addVote(id);
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
