import { PgnRouting } from './pgnRouting';
import { N2k } from './n2k';
import { WiFi } from './wifi';
import { Port } from './port';

export class AisConfigurationStructure {

  pgnHelper: PgnRouting;
  n2kToWifi: N2k;
  nmea0183toWiFi: N2k;
  wifiHelper: WiFi;
  port1Helper: Port;
  port2Helper: Port;

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
    public mWiFiConfigFlags: string,
  ) {
    this.pgnHelper = PgnRouting.init(Number(mPgnRoutingFlags));
    this.n2kToWifi = N2k.init(Number(mN2kToNmea0183Flags));
    this.nmea0183toWiFi = N2k.init(Number(mNmea0183ToWiFiFlags));
    this.wifiHelper = WiFi.init(mWiFiConfigFlags);
    this.port1Helper = Port.init(mPort1BaudRateSetting, mPort1SentenceSetting);
    this.port2Helper = Port.init(mPort2BaudRateSetting, mPort2SentenceSetting);
  }

  static fromJsonList(array): AisConfigurationStructure[] {
    //debugger;
    return array.map(json => AisConfigurationStructure.fromJson(json))
  }

  static fromJson({ mCallSign, mDimensionIntA, mDimensionIntB, mDimensionIntC, mDimensionIntD, mLongRangeModeEnabled, mExternalSilentModeEnabled, mMMSI, mPort1BaudRateSetting, mPort1SentenceSetting, mPort2BaudRateSetting, mPort2SentenceSetting, mSilentModeEnabled, mVesselName, mVesselType, mWiFiPassPhrase, mWiFiSSID, mN2kToNmea0183Flags, mNmea0183ToWiFiFlags, mPgnRoutingFlags, mWiFiConfigFlags, }): AisConfigurationStructure {

    //debugger;
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
      mWiFiConfigFlags,
    );
  }

}
