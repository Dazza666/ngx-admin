export class ProductInfo {

  constructor(
    public batteryExp: string,
    public serialNumber: string,
    public vesselName: string,
    public vesselType: string,
    public uin: string,
    public result: string,
    public productType: string,
    public mountedARH100: string,
    public failureReason: string,
    public arh100ManufactureDate: string,
  ) {

  }

  getFormattedSerial() {
    return `Serial: ${this.serialNumber}`;
  }

  getFormattedBatteryExpiry() {
    return `Battery expiry: ${this.batteryExp}`;
  }

  getFormattedHasARH100Mount() {
    if (this.mountedARH100 == null) {
      return "Unknown";
    }
    else {
      return `Has ARH100 Mount: ${this.mountedARH100}`;
    }
  }

  getFormattedARH100ManufactureDate() {
    if (this.result == null) {
      return "Unknown";
    }
    else {
      return `ARH100 Manufacture Date: ${this.arh100ManufactureDate}`;
    }
  }

  getFormattedResult() {
    if (this.result == null) {
      return "Unknown";
    }
    else {
      return `Result: ${this.result} ` + (this.failureReason == "N/A" ? "" : " - " + this.failureReason);
    }
  }

  //The list of products needs to be converted in a javascript array
  static fromJsonList(array): ProductInfo[] {
    let results = [];
    for (const [key, value] of Object.entries(array)) {
      results.push(ProductInfo.fromJson(value as ProductInfo));
    }
    return results;
  }

  static fromJson({ batteryExp, serialNumber, vesselName, vesselType, uin, result, productType, mountedARH100, failureReason, arh100ManufactureDate }): ProductInfo {

    // debugger;
    return new ProductInfo(
      batteryExp,
      serialNumber,
      vesselName,
      vesselType,
      uin,
      result,
      productType,
      mountedARH100,
      failureReason,
      arh100ManufactureDate,
    );
  }

}
