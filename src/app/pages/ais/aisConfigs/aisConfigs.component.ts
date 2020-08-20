import { Component, ɵConsole } from '@angular/core';
import { Observable, of, Subscription, combineLatest, forkJoin, pipe, from } from 'rxjs';
import { map, scan, switchMap, mergeMap, mapTo, toArray } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList, AngularFireAction } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AisConfigurationItem } from '../aisConfigurations/aisConfigurationItem';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concatMap';
import { Subject } from 'rxjs/Subject';
import { debug } from 'console';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './aisConfigs.component.html',
})
export class AisConfigsComponent {
  tableDataLoading = true;
  userIds$: Observable<any[]>;
  userConfigs$: Observable<Observable<AisConfigurationItem[]>[]>
  users$: BehaviorSubject<string | null>;
  resultsLimit = 5;

  constructor(
    db: AngularFireDatabase,
  ) {
    this.users$ = new BehaviorSubject(null);
    this.userIds$ = this.users$.switchMap(email =>
      db.list('/USERS/', ref => {
        //email = "darr"
        let temp = email ? ref.orderByChild('EMAIL').startAt("darr").endAt("darr" + "\uf8ff").limitToFirst(this.resultsLimit) : ref.limitToLast(this.resultsLimit)
        console.log('carrot');
        return temp;
      }
      ).snapshotChanges()
    );

    this.userConfigs$ = this.userIds$.pipe(
      map(userids =>
        userids.map(userid =>
          db.list('/AIS/USERSAVEDCONFIGS/' + userid.key).snapshotChanges().pipe(
            map(changes => {
              console.log(changes);
              changes.forEach(array => {
                console.log("gakß" + array.payload.val())
              })
              return AisConfigurationItem.fromFirebaseList(changes)
            }
            )
          )
        )
      )
    )
  }

  onKeyUpEvent(event: any) {
    console.log(event.target.value);
    //Only start when we have 4 or more chars
    if (event.target.value.length >= 4) {
      this.filterBy(event.target.value);
    }
    else if (event.target.value.length == 0) {
      this.filterBy(null);
    }
  }

  filterBy(email: string | null) {
    this.users$.next(email);
  }

  stopLoading() {
    this.tableDataLoading = false;
  }

}
