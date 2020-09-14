import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { SupportItem } from './supportItem/supportItem';
import { ProductInfo } from './supportItem/productInfo';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent {
  tableDataLoading = true;
  supportRequests$: Observable<SupportItem[]>;
  ImageUrls$: Observable<String>[];
  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
  ) {

    //get the support requests
    this.supportRequests$ = db.list("SUPPORT/vendor/oceansignal/programs/v100/requests/").snapshotChanges().pipe(
      map(changes => 
        //create all the items from our firebase object
        SupportItem.fromFirebaseList(changes)
      )
    );
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
    console.log("hello");
    console.log(ref.key);
    console.log(ref.parent);
    console.log(updatedNotes);

    let notesPostData = {
      notes: updatedNotes
    };

    ref.child('status').update(notesPostData);
  }

}
