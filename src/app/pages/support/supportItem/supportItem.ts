import { Gdpr } from './gdpr';
import { status } from './status';
import { SupportRequestInfo } from './supportRequestInfo';
import { ProductInfo } from './productInfo';

export class SupportItem {

  constructor(
    // public supportItemId: string,
    // public mModelNumber: string,
    // public mProductName: string,
    // public mSerialNumber: string,
    public ref: any,
    public supportRequestInfo: SupportRequestInfo,
    public productInfo: ProductInfo[],
    public status: status,
    public GDPR: Gdpr,
  ) {

  }

  static fromFirebaseList(dataSnapshot): SupportItem[] {

    let results = [];
    //for each of the top level children of the dataSnapshot
    dataSnapshot.forEach(child => {
      //iterate it, and for each item create the support object
      child.payload.forEach(supportRequest => {
        results.push(SupportItem.fromJson(supportRequest.toJSON(), supportRequest.ref))
      })
    })
    return results;
  }

  // static fromJsonList(array): SupportItem[] {
  //   //debugger;
  //   return array.map(json => SupportItem.fromJson(json))
  // }

  static fromJson(json, ref): SupportItem {

    console.log("whos that girl");
    console.log(json);
    console.log("its jess");
    console.log(ref);
    // console.log(json.payload.val());
    // json.payload.forEach(function(childSnapshot) {
    //   console.log(childSnapshot.val());
    // });

    debugger;
    return new SupportItem(
      ref,
      json.supportRequestInfo,
      json.productInfo,
      json.status,
      json.GDPR,
    );
  }

}
