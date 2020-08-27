import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ViewCell } from 'ng2-smart-table';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { DialogComponent } from '../../../components/dialog.component';
import { RadioOptions } from '../../../components/RadioOptions';

@Component({
  selector: 'button-view',
  styleUrls: ['../../../@theme/styles/themes.scss'],
  template: `
  <button class="button buttonYes" (click)="onClickYes()"> Release </button> Or <button class="button buttonNo" (click)="onClickNo()"> Reject </button>
  `,
})

export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() clickYes: EventEmitter<any> = new EventEmitter();
  @Output() clickNo: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClickYes() {
    this.clickYes.emit(this.rowData);
  }
  onClickNo() {
    this.clickNo.emit(this.rowData);
  }

}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['mmsiManagement.component.scss'],
  templateUrl: './mmsiManagement.component.html',
})
export class MmsiManagementComponent {
  mmsiRefList: AngularFireList<any>;
  mmsiRefListLocked: AngularFireList<any>;
  mmsiList: Observable<any[]>;
  tableDataLoading = true;
  settings: any;

  constructor(
    db: AngularFireDatabase,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
  ) {
    //The reference to the location we want to get data from, with query ordering results by 'requestClear'
    this.mmsiRefList = db.list('/AIS/MMSI/', ref =>
      ref.orderByChild('state').equalTo('requestClear')
    );
    //The reference to the location we want to get data from, with query ordering results by 'locked'
    this.mmsiRefListLocked = db.list('/AIS/MMSI/', ref =>
      ref.orderByChild('state').equalTo('locked')
    );
    //What is this magic?
    //So, we are using combineLatest here. It takes the data from both obserables to particular references
    this.mmsiList = combineLatest(this.mmsiRefList.snapshotChanges(), this.mmsiRefListLocked.snapshotChanges())
      .pipe(map(x => x[0].concat(x[1]))).pipe(map(changes => {
        let temp = changes.map(c => ({
          mmsi: c.payload.key,
          state: c.payload.val().state,
          vendor: c.payload.val().vendor,
          userid: c.payload.val().userid,
          ref: c.payload.ref,
        }))
        this.stopLoading();
        return temp;
      }));

    //Set the table up, ready for our data
    this.setupTable();
  }

  stopLoading() {
    this.tableDataLoading = false;
  }

  private updateReference(ref, state, message) {
    var updates = {};
    updates["/state"] = state;
    updates["/message"] = message;
    ref.update(updates);
  }

  private showToast(position, status, message) {
    this.toastrService.show(
      status || 'Success',
      message,
      { position, status });
  }

  private showReasonDialog(row) {
    //Define the options we want to provide to the user
    let radioOptions = [
      { value: 'Request denied: Not Permitted', label: 'Not permitted', checked: true } as RadioOptions,
      { value: 'Request denied: This MMSI was programmed by another user', label: 'Not programmed by this user' } as RadioOptions,
      { value: 'Request denied: Unknown', label: 'Unknown' } as RadioOptions,
    ]

    this.dialogService.open(DialogComponent, {
      context: {
        title: 'Select the reason this MMSI release request is being denied and press Ok, press Cancel to abort.',
        options: radioOptions,
        status: 'danger',
      },
    }).onClose.subscribe(result => {
      console.log(result);
      this.updateReference(row.ref, "locked", result);
      this.showToast('top-right', 'success', 'successfully locked');
    });
  }

  setupTable() {
    this.settings = {
      actions: {
        add: false,
        edit: false,
        delete: false,
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
        button: {
          title: 'Actions',
          type: 'custom',
          renderComponent: ButtonViewComponent,
          onComponentInitFunction: (instance) => {
            instance.clickYes.subscribe(row => {
              this.updateReference(row.ref, "released", "Your MMSI release request has been accepted");
              this.showToast('top-right', 'success', 'successfully released');
            });
            instance.clickNo.subscribe(row => {
              this.showReasonDialog(row);
            });
          }
        },
      },
    };
  }
}

