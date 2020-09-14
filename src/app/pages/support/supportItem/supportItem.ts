import { Gdpr } from './gdpr';
import { Status } from './status';
import { SupportRequestInfo } from './supportRequestInfo';
import { ProductInfo } from './productInfo';

export class SupportItem {

  constructor(
    public ref: any,
    public supportRequestInfo: SupportRequestInfo,
    public productInfo: ProductInfo[],
    public status: Status,
    public GDPR: Gdpr,
  ) {

  }

  getUrl() {
    return 'www.test.com'
  }

  getReplacementText() {
    return `please send ${Object.keys(this.productInfo).length} replacement(s) to:`
  }

  needsReplacements() {
    return `${this.ref.parent.key}/${this.ref.key}`
  }

  isAddressPerm() {
   return this.supportRequestInfo.ADR_START_DATE_VALID.length == 0
  }

  getAddressValidRange() {
    if (!this.isAddressPerm()) {
      return "Address Valid Dates:" + this.supportRequestInfo.ADR_START_DATE_VALID + " - " + this.supportRequestInfo.ADR_END_DATE_VALID;
    }
    else {
      return '---'
    }
  }

  getPhoneNumber() {
    return `Phone: ${this.supportRequestInfo.PHONE}`;
  }

  getEmail() {
    return `Email: ${this.supportRequestInfo.EMAIL}`;
  }

  getId() {
    return `${this.ref.parent.key} / ${this.ref.key}`
  }

  getUnformattedId() {
    return this.getId().replace(/ /g,'');
  }

  getAddress() {

    let address2 = this.supportRequestInfo.ADDRESS_2 || "";
    if (address2.length != 0) {
        address2 += '<br>';
    }
    let address3 = this.supportRequestInfo.ADDRESS_3 || "";
    if (address3.length != 0) {
        address3 += '<br>';
    }

    return `${this.supportRequestInfo.FIRST_NAME} 
    ${this.supportRequestInfo.LAST_NAME} <br>
    ${this.supportRequestInfo.ADDRESS_1} <br>
    ${address2} 
    ${address3} 
    ${this.supportRequestInfo.TOWN} <br>
    ${this.supportRequestInfo.POST_CODE} <br>
    ${this.supportRequestInfo.COUNTRY}`;
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

  static fromJson(json, ref): SupportItem {

    // debugger;
    return new SupportItem(
      ref,
      json.supportRequestInfo,
      ProductInfo.fromJsonList(json.productInfo),
      json.status,
      json.GDPR,
    );
  }

}
