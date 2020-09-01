export class ProductInfo {

  constructor(
    public batteryExp: string,
    public serialNumber: string,
    public vesselName: string,
    public vesselType: string,
  ) {

  }

  static fromJsonList(array): ProductInfo[] {
    return array.map(json => ProductInfo.fromJson(json))
  }

  static fromJson({ batteryExp, serialNumber, vesselName, vesselType }): ProductInfo {

    debugger;
    return new ProductInfo(
      batteryExp,
      serialNumber,
      vesselName,
      vesselType,
    );
  }

}
