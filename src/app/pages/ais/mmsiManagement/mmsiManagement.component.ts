import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, share, take } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['mmsiManagement.component.scss'],
  templateUrl: './mmsiManagement.component.html',
})
export class MmsiManagementComponent {
  itemsRefList: AngularFireList<any>;
  itemsList: Observable<any[]>;
  tableDataLoading = true;

  constructor(
    db: AngularFireDatabase,
  ) {
    //The reference to the location we want to get data from
    this.itemsRefList = db.list('/AIS/MMSI/');
    //Whats happening here, we are syncing the list data locally, then piping that input into a map, which iterates over the returned array of data, and we are
    //changing some of the content, so the product field contains the key, in this case maybe its ATB1, and then the firmware field contains the value of the 'latest' child node, in this case maybe 1.0.0
    this.itemsList = this.itemsRefList.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          mmsi: c.payload.key,
          state: c.payload.val().state,
          vendor: c.payload.val().vendor,
          userid: c.payload.val().userid,
          ref: c.payload.ref,
        })
        )
      )
    );
  }

  onCustom(event) {
    alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`)
  }

  settings = {
    actions:{
      add:false,
      edit:false,
      delete:false,
        custom: [
          {
            name: 'accept',
            title: '<i class="nb-checkmark"></i>',
          },
          {
            name: 'deny',
            title: '<i class="nb-close"></i>',
          },
        ],
    },
    columns: {
      mmsi: {
        title: 'MMSI',
        editable: false,
      },
      state: {
        title: 'State',
        editable: false,
      },
      vendor: {
        title: 'Vendor',
        editable: false,
      },
      userid: {
        title: 'UserId',
        editable: false,
      },
    },
  };
}
