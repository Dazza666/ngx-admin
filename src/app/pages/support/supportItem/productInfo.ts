export class ProductInfo {

  constructor(
    public batteryExp: string,
    public serialNumber: string,
    public vesselName: string,
    public vesselType: string,
  ) {

  }

  getFormattedSerial() {
    return `Serial: ${this.serialNumber}`;
  }

  getFormattedBatteryExpiry() {
    return `Battery expiry: ${this.batteryExp}`;
  }

  //The list of products needs to be converted in a javascript array
  static fromJsonList(array): ProductInfo[] {
    let results = [];
    for (const [key, value] of Object.entries(array)) {
      results.push(ProductInfo.fromJson(value as ProductInfo));
    }
    return results;
  }

  static fromJson({ batteryExp, serialNumber, vesselName, vesselType }): ProductInfo {

    // debugger;
    return new ProductInfo(
      batteryExp,
      serialNumber,
      vesselName,
      vesselType,
    );
  }

}
