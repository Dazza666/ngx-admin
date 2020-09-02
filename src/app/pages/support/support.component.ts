import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concatMap';
import { SupportItem } from './supportItem/supportItem';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent {
  tableDataLoading = true;
  database: AngularFireDatabase;
  supportRequests$: Observable<SupportItem[]>
  constructor(
    db: AngularFireDatabase,
  ) {
    this.database = db;

    //get the support requests
    this.supportRequests$ = this.database.list("SUPPORT/vendor/oceansignal/programs/v100/requests/").snapshotChanges().pipe(
      map(changes =>
        SupportItem.fromFirebaseList(changes)
      )
    );

  }

  stopLoading() {
    this.tableDataLoading = false;
  }

}
