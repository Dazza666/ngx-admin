import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './firmware.component.html',
})
export class FirmwareComponent {
  itemsRefList: AngularFireList<any>;
  itemsList: Observable<any[]>;
  tableDataLoading = true;

  constructor(
    db: AngularFireDatabase,
  ) {
    //The reference to the location we want to get data from
    this.itemsRefList = db.list('/SOFTWARE/embedded/ais');
    //Whats happening here? we are syncing the list data locally, then piping that input into a map, which iterates over the returned array of data, and we are
    //changing some of the content, so the product field contains the key, in this case maybe its ATB1, and then the firmware field contains the value of the 'latest' child node, in this case maybe 1.0.0
    this.itemsList = this.itemsRefList.snapshotChanges().pipe(
      map(changes =>{
       let temp = changes.map(c => ({
          product: c.payload.key,
          firmware: c.payload.child('latest').val(),
          ref: c.payload.ref,
        }))
        this.stopLoading();
       //map is done here, should be able to call other code
       return temp;
      })
    );
  }

  stopLoading() {
    this.tableDataLoading = false;
  }

  // When the user wants to delete a entry, we ask them, but regardless what they say we will reject the promise.
  // Why? Because we are using firebase as our datasource, but the table only works with a local datasource, we map the firebase object to a local array.
  // To elaborate, when we update the reference the data will be sent back to firebase, which will in turn send the data back to us, which in turn will cause the local data
  // Store to be updated and the data will refresh. So its pointless, and indeed dangerous in case the firebase write fails but looks like it succeeded
  onDeleteConfirm(event): void {
    if (window.confirm('WARNING! If you delete this entry, it may impact other services (e.g. AIS Mobile apps) that use this data. Are you certain?')) {
      event.data.ref.remove();
      this.tableDataLoading = true;
      //intentional, see above
      event.confirm.reject();
    } else {
      event.confirm.reject();
    }
  }

  // When the user wants to confirm a edit, we ask them, but regardless what they say we will reject the promise.
  // Why? Because we are using firebase as our datasource, but the table only works with a local datasource, we map the firebase object to a local array.
  // To elaborate, when we update the reference the data will be sent back to firebase, which will in turn send the data back to us, which in turn will cause the local data
  // Store to be updated and the data will refresh. So its pointless, and indeed dangerous in case the firebase write fails but looks like it succeeded
  onEditConfirm(event): void {
    if (window.confirm('Are you sure what you want to make this edit?')) {
      event.newData.ref.update({ latest: event.newData.firmware });
      this.tableDataLoading = true;
      //intentional, see above
      event.confirm.reject();
    } else {
      event.confirm.reject();
    }
  }

  // When the user wants to add a entry, we ask them, but regardless what they say we will reject the promise.
  // Why? Because we are using firebase as our datasource, but the table only works with a local datasource, we map the firebase object to a local array.
  // To elaborate, when we update the reference the data will be sent back to firebase, which will in turn send the data back to us, which in turn will cause the local data
  // Store to be updated and the data will refresh. So its pointless, and indeed dangerous in case the firebase write fails but looks like it succeeded
  onCreateConfirm(event): void {
    if (window.confirm('Are you sure what you want to add this product?')) {
      this.itemsRefList.update(event.newData.product, { latest: event.newData.firmware });
      this.tableDataLoading = true;
      //intentional, see above
      event.confirm.reject();
    } else {
      event.confirm.reject();
    }
  }

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      product: {
        title: 'Product',
        editable: false,
      },
      firmware: {
        title: 'Firmware',
      },
    },
  };

}
