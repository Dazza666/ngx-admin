export class Port {

  constructor(
    public baud: string,
    public output: string,
  ) {

  }

  getOutputMode(): String {
    switch (this.output) {
      case "-1": {
        return "All";
      }
      case "402913280": {
        return "GPS only";
      }
      default: {
        return "Error! Invalid Information";
      }
    }
  }

  getBaud() {
    return this.baud;
  }

  static init(baud, output): Port {
    debugger;
    return new Port(
      baud,
      output,
    );
}

}
