import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, first, tap, flatMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
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
  programName: string;
  hasPassed = false;
  hasSubmitted = false;
  hasAuthorised = false;
  hasCompleted = false;
  //chart data Observable
  stats$: Observable<{ name: string; value: any; }[]>
  // chart options
  view: any[] = [700, 400];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
  ) {
    //What is happening here? Because the support programs broadly follow the same structure, at least in there locations
    //we are passing a query string into the URL, which, in turn is then used to form the location in the database where we are
    //looking for our data. Once we have listened for snapshotChanges() on this location, we then turn the dataset into a SupportItem array.
    //But, that is not all, we also tap the output (tap, just looking into the item but does not mod it) to check if we have any failures or what not
    //so we can show a helpful message to the user in the 
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
            //Do we have any passes in the whole dataset?
            if (!this.hasFailures(item)) {
              this.hasPassed = true;
            }
            //Do we have any submitted states?
            if (item.status.state == null) {
              this.hasSubmitted = true;
            }
            //Do we have any authorised states?
            else if (item.status.state == 'authorised') {
              this.hasAuthorised = true;
            }
            //Do we have any shipped states?
            else if (item.status.state == 'shipped') {
              this.hasCompleted = true;
            }
          }
        })
      );
    })
    ).pipe(flatMap(listObservable => listObservable));

    this.stats$ = db.list('SUPPORT/vendor/oceansignal/programs/metadata/e100/statistics').snapshotChanges().pipe(
      map(changes =>{
        console.log("jimbob");
       let temp = changes.map(c => ({
          name: c.payload.key,
          value: c.payload.val(),
        }))
        console.log(temp);
       return temp;
      })
    );

  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
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

  hasFailedSubmission(supportRequest: SupportItem) {
    if (supportRequest.status.submissionState != "success") {
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
