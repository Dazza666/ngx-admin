import { MetaData } from './metaData';
import { AisConfigurationStructure } from './aisConfigurationStructure';

export class AisConfigurationItem {

  constructor(
    public mManufacturerID: string,
    public mModelNumber: string,
    public mProductName: string,
    public mSerialNumber: string,
    public mEncodedConfig: string,
    public mMetaData: MetaData,
    public mAISDeviceDataStructure: AisConfigurationStructure,
  ) {

  }

  static fromJsonList(array): AisConfigurationItem[] {
    return array.map(json => AisConfigurationItem.fromJson(json))
  }

  static fromJson({ mManufacturerID, mModelNumber, mProductName, mSerialNumber, encodedConfig, mMetaData, mAISDeviceDataStructure }): AisConfigurationItem {

    debugger;
    return new AisConfigurationItem(
      mManufacturerID,
      mModelNumber,
      mProductName,
      mSerialNumber,
      encodedConfig,  
      mMetaData,    
      mAISDeviceDataStructure,
    );
  }

}
