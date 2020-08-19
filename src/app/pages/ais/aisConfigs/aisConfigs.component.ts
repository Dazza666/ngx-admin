import { Component, ɵConsole } from '@angular/core';
import { Observable, of, Subscription, combineLatest, forkJoin, pipe, from } from 'rxjs';
import { map, scan, switchMap, mergeMap, mapTo, toArray } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList, AngularFireAction } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AisConfigurationItem } from '../aisConfigurations/aisConfigurationItem';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concatMap';
import { debug } from 'console';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './aisConfigs.component.html',
})
export class AisConfigsComponent {
  itemsRefList: AngularFireList<any>;
  itemsList: Observable<any[]>;
  tableDataLoading = true;
  userIds$: Observable<any[]>;
  userConfigs$: Observable<Observable<AisConfigurationItem[]>[]>
  userSuperDuper$: Observable<any>;
  users$: BehaviorSubject<string | null>;
  // userConfigs$: Observable<any[]>;

  oi: AisConfigurationItem;

  userConfigsTest$: Observable<any[]>;
  userConfigsArray: any[] = [];

  myBiscuits$: Observable<AisConfigurationItem[]>;

  constructor(
    db: AngularFireDatabase,
  ) {
    this.users$ = new BehaviorSubject(null);
    this.userIds$ = this.users$.switchMap(email =>
      db.list('/USERS/', ref => {
        email = "darr"
        let temp = email ? ref.orderByChild('EMAIL').startAt("darr").endAt("darr" + "\uf8ff") : ref
        console.log('carrot');
        return temp;
      }
      ).snapshotChanges()
    );

    this.userConfigs$ = this.userIds$.pipe(
      map(userids =>
        userids.map(userid => 
           db.list('/AIS/USERSAVEDCONFIGS/' + userid.key).snapshotChanges().pipe(
            map(changes => 
               AisConfigurationItem.fromFirebaseList(changes)
            )
          )
        )
      )
    )

    // this.userConfigs$ = this.userIds$.pipe(
    //   switchMap(itemIds => from(itemIds).pipe(
    //     map(itemId => {
    //       console.dir(itemId)
    //       console.log("here" + itemId);
    //       return itemId;
    //     })
    //   ))
    // );

    //Subscribe to the output of user ids, when we get a hit (delivered as an array of references) loop through and subscribe to all the children of this location
    // this.userIds$.subscribe(
    //   (references) => {
    //     references.forEach((reference) => {
    //       db.list('/AIS/USERSAVEDCONFIGS/' + reference.key).snapshotChanges(['child_added']).subscribe(actions => {
    //         actions.forEach(action => {
    //           console.log(action.type);
    //           console.log(action.key);
    //           console.log(action.payload.val());
    //           this.userConfigsArray.push(action.payload.val());
    //         });
    //       });
    //     });
    //   },
    //   console.error,
    //   () => console.log('complete')
    // );


    // this.userConfigs$ = this.userIds$.pipe(
    //   switchMap(itemIds => from(itemIds).pipe(
    //     map(itemId => {let cat = `/AIS/USERSAVEDCONFIGS/${itemId.key}`
    //     console.log(cat);
    //   return cat}),
    //     switchMap(pathOrRef => db.list(pathOrRef).snapshotChanges(['child_added']).pipe(mapTo(pathOrRef)))
    //   ))
    // );

    // this.userConfigs$ = this.userIds$.pipe(
    //   switchMap(itemIds => from(itemIds).pipe(
    //     map(itemId => `/AIS/USERSAVEDCONFIGS/${itemId.key}`),
    //     switchMap(pathOrRef => { return db.list(pathOrRef).snapshotChanges(['child_added']).pipe(map(changes => {
    //       let temp = changes.map(c => ({
    //          product: c.payload.key,
    //          firmware: c.payload.val(),
    //          ref: c.payload.ref,
    //        }))
    //        console.log(temp);
    //       //map is done here, should be able to call other code
    //       return temp;
    //      }))
    //   })
    //   ))
    // );


    //this.userSuperDuper$ = this.userConfigs$.pipe(map(itemID => {console.log(itemID)}));

    //Subscribe to the output of user ids, when we get a hit (delivered as an array of Observable DataSnapshot) loop through and subscribe to all the children of this location
    // this.userConfigs$ = this.userIds$.pipe(
    //   switchMap(itemIds => {
    //     let configs = itemIds.map(itemId => {
    //       let pathOrRef = '/AIS/USERSAVEDCONFIGS/' + itemId.key;
    //       console.log('tomato');
    //       return db.list(pathOrRef).snapshotChanges(['child_added']);
    //     });
    //     console.log(configs);
    //     return configs;
    //   })
    // );


    // this.userSuperDuper$ = this.userConfigs$.pipe(
    //   switchMap(itemIds => {
    //     let configs = itemIds.map(itemId => {
    //       console.log("fish");
    //       console.log(itemId);
    //       return itemId.payload.val();
    //     });
    //     return configs;
    //   })
    //   );

    //     //Subscribe to the output of user ids, when we get a hit (delivered as an array of references) loop through and subscribe to all the children of this location
    // this.userConfigs$.subscribe(
    //   (references) => {


    //     references.forEach((reference) => {

    //       forkJoin 
    //       db.list('/AIS/USERSAVEDCONFIGS/' + reference.key).snapshotChanges(['child_added']).subscribe(actions => {
    //         forkJoin (actions.forEach(action => {})

    //         actions.forEach(action => {

    //           console.log(action.type);
    //           console.log(action.key);
    //           console.log(action.payload.val());
    //           this.userConfigsArray.push(action.payload.val());
    //         });
    //       });
    //     });
    //   },
    //   console.error,
    //   () => console.log('complete')
    // );

    //Subscribe to the output of user ids, when we get a hit (delivered as an array of Observable DataSnapshot) loop through and subscribe to all the children of this location
    // this.userConfigs$ = this.userIds$.pipe(
    //   switchMap(itemIds => {
    //     let configs = itemIds.map(itemId => {
    //       let pathOrRef = '/AIS/USERSAVEDCONFIGS/' + itemId.key;
    //       console.log('tomato');
    //       return db.list(pathOrRef).snapshotChanges(['child_added']).switchMap(actions => {
    //         return actions.map(config => {
    //           console.log(config.payload.val());
    //           return config.payload.val()
    //         })
    //       })
    //     });
    //     console.log(configs);
    //     return configs;
    //   })
    // );

    // .pipe(
    //   map(changes =>{
    //    let temp = changes.map(c => ({
    //       product: c.payload.key,
    //       firmware: c.payload.child('latest').val(),
    //       ref: c.payload.ref,
    //     }))
    //     this.stopLoading();
    //    //map is done here, should be able to call other code
    //    return temp;
    //   })

    // this.userConfigs$.subscribe();
    //this.userConfigs$.subscribe(console.log);

    //  (references => 
    // db.list('/AIS/USERSAVEDCONFIGS/' + references.key).snapshotChanges(['child_added'])
  }

  fakeDatabaseCall(path: string) {
    return of(null);
  }

  onKeyUpEvent(event: any) {
    console.log(event.target.value);
    //Only start when we have 4 or more chars
    if (event.target.value.length >= 4) {
      this.userConfigsArray = [];
      this.filterBy(event.target.value);
    }
  }

  filterBy(email: string | null) {
    this.users$.next(email);
  }

  stopLoading() {
    this.tableDataLoading = false;
  }

}
