import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, first, tap, flatMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { SupportItem } from './supportItem/supportItem';
import { ProductInfo } from './supportItem/productInfo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent {
  tableDataLoading = true;
  supportRequests$: Observable<SupportItem[]>;
  ImageUrls$: Observable<String>[];
  programName: string;
  hasSubmitted = false;
  hasAuthorised = false;
  hasCompleted = false;
  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
  ) {

    //What is happening here?
    
    this.supportRequests$ = this.route.queryParams.pipe(map(parameters => {      
      this.programName = parameters.productName;
      return db.list(`SUPPORT/vendor/oceansignal/programs/${this.programName}/requests/`).snapshotChanges().pipe(
        map(changes =>
          //create all the items from our firebase object
          SupportItem.fromFirebaseList(changes)
        ), tap(SupportItems => {
          this.hasSubmitted = false;
          this.hasAuthorised = false;
          this.hasCompleted = false;
          for (const item of SupportItems) {
            if (item.status.state == null) {
              this.hasSubmitted = true;
            }
            else if (item.status.state == 'authorised') {
              this.hasAuthorised = true;
            }
            else if (item.status.state == 'shipped') {
              this.hasCompleted = true;
            }
          }
        })
      );
    })
    ).pipe(flatMap(listObservable => listObservable));

  }

  stopLoading() {
    this.tableDataLoading = false;
  }

  generateImagePath(id: string, productInfo: ProductInfo) {
    //create the reference to the location
    let ref = this.storage.ref('/SUPPORT/vendor/oceansignal/programs/v100/' + id + '/' + productInfo.serialNumber + '_' + productInfo.batteryExp.replace('/', '_') + '.jpg');

    //get the observable and pipe it through first, which will auto unsubcribe for us after the first value is returned
    ref.getDownloadURL().pipe(first()).subscribe(url =>
      window.open(url, productInfo.serialNumber + productInfo.batteryExp, "height=720,width=1280")
    );

  }

  //We have the reference, we can now update the notes
  updateNotes(ref, updatedNotes: string) {
    let notesPostData = {
      notes: updatedNotes
    };

    ref.child('status').update(notesPostData);
  }

  authorise(ref) {
    let postData = {
      state: "authorised"
    };
    ref.child('status').update(postData);
  }

  reject(ref) {
    let postData = {
      state: "rejected"
    };
    ref.child('status').update(postData);
  }

  shipped(ref) {
    let postData = {
      state: "shipped"
    };
    ref.child('status').update(postData);
  }

}
