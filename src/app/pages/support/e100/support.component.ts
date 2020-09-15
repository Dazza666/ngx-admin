import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, first, tap, flatMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { SupportItem } from '../supportItem/supportItem';
import { ProductInfo } from '../supportItem/productInfo';
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

  generateReplacementText(supportRequest: SupportItem) {

    let result: string = null;
    let replacementEPIRBCount = 0; //with no mount
    let replacementEPIRB1ProCount = 0; //with mount

    for (const product of supportRequest.productInfo) {
      //If we have a failure, work out if its a pro or non pro product
      if (product.result == "fail") {
        if (product.mountedARH100 == "yes") {
          replacementEPIRB1ProCount++;
        }
        else {
          replacementEPIRBCount++;
        }
      }
    }

    if (replacementEPIRB1ProCount == 0 && replacementEPIRBCount == 0) {
      result = 'There are no replacements to send for this request';
    }
    else {
      var epirbPro = (replacementEPIRB1ProCount == 0) ? `` : ` ` + replacementEPIRB1ProCount + ` x EPIRB Pro <br>`;
      var epirb = (replacementEPIRBCount == 0) ? `` : ` ` + replacementEPIRBCount + ` x rescueME EPIRB1 <br>`;
      result = `Please send <br>` + epirb + epirbPro + ` replacement(s) to: <br>`;
    }

    return result;
  }

  hasFailures(supportRequest: SupportItem) {
    for (const product of supportRequest.productInfo) {
      if (product.result == "fail") {
        return true;
      }
    }
    return false;
  }

  hasFailed(product: ProductInfo) {
      if (product.result == "fail") {
        return true;
      }
    return false;
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
