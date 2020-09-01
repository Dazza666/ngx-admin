import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, flatMap, switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AisConfigurationItem } from '../ais/aisConfigurations/aisConfigurationItem';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concatMap';
import { Subject } from 'rxjs/Subject';
import { SupportItem } from './supportItem/supportItem';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent {
  tableDataLoading = true;
  userIds$: Observable<any[]>;
  mmsi$: Observable<any[]>;
  userConfigs$: Observable<Observable<AisConfigurationItem[]>[]>
  users$: BehaviorSubject<string | null>;
  mmsis$: Subject<string | null>;
  resultsLimit = 5;
  database: AngularFireDatabase;
  filterEmail: string;
  filterMmsi: string;
  supportRequests$: Observable<SupportItem[]> 
  constructor(
    db: AngularFireDatabase,
  ) {
    this.database = db;
    this.users$ = new BehaviorSubject(null);
    this.mmsis$ = new BehaviorSubject(null);
    //setup default search method, which is email
    this.setupUserEmailSearch();

    this.supportRequests$ = this.database.list("SUPPORT/vendor/oceansignal/programs/v100/requests/").snapshotChanges().pipe(
      map(changes => {

        //for (let change of changes){
          return SupportItem.fromFirebaseList(changes)
       // }

         //changes.forEach(jeff => { return SupportItem.fromFirebaseList(jeff)} ) 
      }
       
        )
      );

  }

  setupUserEmailSearch() {
    //setup what happens when data is entered into the email search box
    this.userIds$ = this.users$.switchMap(email =>
      this.database.list('/USERS/', ref => 
        email ? ref.orderByChild('EMAIL').startAt(email).endAt(email + "\uf8ff").limitToFirst(this.resultsLimit) : ref.limitToLast(this.resultsLimit)
      ).snapshotChanges()
    );

    //sets up the search to respond to changes in the users email address entry
    this.userConfigs$ = this.userIds$.pipe(
      map(userids =>
        userids.map(userid =>
          this.database.list('/AIS/USERSAVEDCONFIGS/' + userid.key).snapshotChanges().pipe(
            map(changes =>
              AisConfigurationItem.fromFirebaseList(changes)
            )
          )
        )
      )
    )
  }

  setupUserMmsiSearch() {
    //setup what happens when data is entered into the mmsi search box

    //So, here we are taking the mmsi that has been entered by the user, (and maybe modded to return a mmsi with a length of 9) and are querying firebase for it
    //We are registering for these changes, and then switching to this new observable, once we have the MMSI dataset we then unfurl the data through a map
    //and get a reference to the '/USERS/' location in the database, and query it based on the key (keys are the userIds here) starting at the user id we have pulled from
    //the mmsi child. We limit it to 1 because only one user can have a MMSI assigned to them anyway. Critically, this also means we get the payload as the user details object
    //otherwise we get all the inner children which is no good
    //Finally, because this is a Observable<Observable<SnapshotActions[]>> but we want a Observable<any[]>; we use a flatmap to flaten.
    this.userIds$ = this.mmsis$.switchMap(mmsi =>
      this.database.list('/AIS/MMSI/', ref => mmsi ? ref.orderByKey().startAt(mmsi).limitToFirst(this.resultsLimit) : ref.limitToFirst(this.resultsLimit)
      ).snapshotChanges()
    ).switchMap(mmsiDataSet =>
      mmsiDataSet.map(mmsiData => this.database.list('/USERS/', ref =>
        ref.orderByKey().startAt(mmsiData.payload.child('userid').val()).limitToFirst(1)
      ).snapshotChanges())
    ).pipe(flatMap(listObservable => listObservable));

    //sets up the search 
    this.userConfigs$ = this.userIds$.pipe(
      map(userids =>
        userids.map(userid =>
          this.database.list('/AIS/USERSAVEDCONFIGS/' + userid.key).snapshotChanges().pipe(
            map(changes =>
              AisConfigurationItem.fromFirebaseList(changes)
            )
          )
        )
      )
    )
  }

  onKeyUpEventMmsi(event: any) {
    //Wipe anything entered into the mmsi field
    this.filterEmail = '';
    console.log("mmsi" + event.target.value);
    //Only start when we have 4 or more chars
    if (event.target.value.length >= 4) {
      this.resultsLimit = 1;
      let modded = event.target.value.padEnd(9, "0");
      this.setupUserMmsiSearch();
      this.filterByMmsi(modded);
    }
    else if (event.target.value.length == 0) {
      this.filterByMmsi(null);
    }
  }

  onKeyUpEventEmail(event: any) {
    //Wipe anything entered into the mmsi field
    this.filterMmsi = '';
    console.log(event.target.value);
    //Only start when we have 4 or more chars
    if (event.target.value.length >= 4) {
      this.resultsLimit = 5;
      this.setupUserEmailSearch();
      this.filterByEmail(event.target.value);
    }
    else if (event.target.value.length == 0) {
      this.filterByEmail(null);
    }
  }

  filterByEmail(email: string | null) {
    this.users$.next(email);
  }

  filterByMmsi(mmsi: string | null) {
    this.mmsis$.next(mmsi);
  }

  stopLoading() {
    this.tableDataLoading = false;
  }

}
