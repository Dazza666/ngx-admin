import { MetaData } from './metaData';
import { AisConfigurationStructure } from './aisConfigurationStructure';

export class AisConfigurationItem {

  constructor(
    public mManufacturerID: string,
    public mModelNumber: string,
    public mProductName: string,
    public mSerialNumber: string,
    public encodedConfig: string,
    public mMetaData: MetaData,
    public mAISDeviceDataStructure: AisConfigurationStructure,
  ) {

  }

  static fromFirebaseList(dataSnapshots): AisConfigurationItem[] {
    //debugger;
    return dataSnapshots.map(json => AisConfigurationItem.fromJson(json.payload.toJSON()))
  }

  static fromJsonList(array): AisConfigurationItem[] {
    //debugger;
    return array.map(json => AisConfigurationItem.fromJson(json))
  }

  static fromJson({ mManufacturerID, mModelNumber, mProductName, mSerialNumber, encodedConfig, mMetaData, mAISDeviceDataStructure }): AisConfigurationItem {
    //debugger;
    return new AisConfigurationItem(
      mManufacturerID,
      mModelNumber,
      mProductName,
      mSerialNumber,
      encodedConfig,  
      MetaData.fromJson(mMetaData),    
      AisConfigurationStructure.fromJson(mAISDeviceDataStructure),
    );
  }

}
