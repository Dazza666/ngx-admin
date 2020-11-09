export class WiFi {

  constructor(
    public configFlags: string,
  ) {

  }

  getMode(): String {
    switch (this.configFlags) {
      case "0": {
        return "WiFi Disabled";
      }
      case "1": {
        return "Direct Mode";
      }
      case "3": {
        return "Network Mode";
      }
      default: {
        return "Information Not Available";
      }
    }
  }

  static init(configFlags): WiFi {
    debugger;
    return new WiFi(
      configFlags
    );
}

}
