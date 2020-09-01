export class Gdpr {

  constructor(
    public CONSCENT_GIVEN: string,
    public CONSCENT_ORIGIN: string,
    public CONSCENT_TEXT: string,
    public TIMESTAMP: string,
  ) {

  }

  static fromJsonList(array): Gdpr[] {
    return array.map(json => Gdpr.fromJson(json))
  }

  static fromJson({ CONSCENT_GIVEN, CONSCENT_ORIGIN, CONSCENT_TEXT, TIMESTAMP }): Gdpr {

    debugger;
    return new Gdpr(
      CONSCENT_GIVEN,
      CONSCENT_ORIGIN,
      CONSCENT_TEXT,
      TIMESTAMP,
    );
  }

}
