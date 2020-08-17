export class MetaData {

  constructor(
    public mVendor: string,
    public mGeneratedWifiPassword: string,
  ) {

  }

  static fromJsonList(array): MetaData[] {
    return array.map(json => MetaData.fromJson(json))
  }

  static fromJson({ mVendor, mGeneratedWifiPassword }): MetaData {

    debugger;
    return new MetaData(
      mVendor,
      mGeneratedWifiPassword,
    );
  }

}
