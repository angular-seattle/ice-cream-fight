import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class FlavorService {

  constructor(private db: AngularFireDatabase) { }

  getFlavors() {
    const flavorList = this.db.list('/flavors', { query: { orderByChild: 'votes' } });
    return flavorList.map((array) => array.slice().reverse());
  }
}

export interface FlavorData {
  votes: number;
  imageUrl: string;
  name: string;
}
