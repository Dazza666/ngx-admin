import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList, AngularFireAction } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './aisConfigs.component.html',
})
export class AisConfigsComponent {
  // itemsRefList: AngularFireList<any>;
  // itemsList: Observable<any[]>;
  tableDataLoading = true;
  userIds$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  users$: BehaviorSubject<string|null>;
  constructor(
    db: AngularFireDatabase,
  ) {
    this.users$ = new BehaviorSubject(null);
    this.userIds$ = this.users$.switchMap(email => 
      db.list('/USERS/', ref => 
      // {

      // let temp = 
      email ? ref.orderByChild('EMAIL').startAt(email).endAt(email+"\uf8ff") : ref
        
      // return temp;
      // }
      ).snapshotChanges()
    );

//   this.userIds$.subscribe(
//     (ref) => console.log("key:"+ref.key),
//     console.error,
//     () => console.log('http2$ completed')
// );

    //The reference to the location we want to get data from
    // this.itemsRefList = db.list('/USERS/');
    //Whats happening here, we are syncing the list data locally, then piping that input into a map, which iterates over the returned array of data, and we are
    //changing some of the content, so the product field contains the key, in this case maybe its ATB1, and then the firmware field contains the value of the 'latest' child node, in this case maybe 1.0.0
    // this.itemsList = this.itemsRefList.snapshotChanges().pipe(
    //   map(changes => {
    //     let temp = changes.map(c => ({
    //       mmsi: c.payload.key,
    //       state: c.payload.val().state,
    //       vendor: c.payload.val().vendor,
    //       userid: c.payload.val().userid,
    //       ref: c.payload.ref,
    //     }))
    //     this.stopLoading();
    //     return temp
    //   })
    //   );
  }

  onKeyUpEvent(event: any){
    console.log(event.target.value);
    if (event.target.value.length >= 4) {
      this.filterBy(event.target.value);
    }
  }

  filterBy(email: string|null) {
    this.users$.next(email); 
  }

  stopLoading() {
    this.tableDataLoading = false;
  }

}
