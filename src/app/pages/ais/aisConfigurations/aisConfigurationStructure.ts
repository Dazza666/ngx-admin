export class AisConfigurationStructure {

  constructor(
    public mCallSign: string,
    public mDimensionIntA: string,
    public mDimensionIntB: string,
    public mDimensionIntC: string,
    public mDimensionIntD: string,
    public mLongRangeModeEnabled: boolean,
    public mExternalSilentModeEnabled: boolean,
    public mMMSI: string,
    public mPort1BaudRateSetting: string,
    public mPort1SentenceSetting: string,
    public mPort2BaudRateSetting: string,
    public mPort2SentenceSetting: string,
    public mSilentModeEnabled: string,
    public mVesselName: string,
    public mVesselType: string,
    public mWiFiPassPhrase: string,
    public mWiFiSSID: string,
    public mN2kToNmea0183Flags: string,
    public mNmea0183ToWiFiFlags: string,
    public mPgnRoutingFlags: string,
  ) {

  }

  static fromJsonList(array): AisConfigurationStructure[] {
    return array.map(json => AisConfigurationStructure.fromJson(json))
  }

  static fromJson({ mCallSign, mDimensionIntA, mDimensionIntB, mDimensionIntC, mDimensionIntD, mLongRangeModeEnabled, mExternalSilentModeEnabled, mMMSI, mPort1BaudRateSetting, mPort1SentenceSetting, mPort2BaudRateSetting, mPort2SentenceSetting, mSilentModeEnabled, mVesselName, mVesselType, mWiFiPassPhrase, mWiFiSSID, mN2kToNmea0183Flags, mNmea0183ToWiFiFlags, mPgnRoutingFlags, }): AisConfigurationStructure {

    debugger;
    return new AisConfigurationStructure(
      mCallSign,
      mDimensionIntA,
      mDimensionIntB,
      mDimensionIntC,
      mDimensionIntD,
      mLongRangeModeEnabled,
      mExternalSilentModeEnabled,
      mMMSI,
      mPort1BaudRateSetting,
      mPort1SentenceSetting,
      mPort2BaudRateSetting,
      mPort2SentenceSetting,
      mSilentModeEnabled,
      mVesselName,
      mVesselType,
      mWiFiPassPhrase,
      mWiFiSSID,
      mN2kToNmea0183Flags,
      mNmea0183ToWiFiFlags,
      mPgnRoutingFlags,
    );
  }

}
