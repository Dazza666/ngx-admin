export class SupportRequestInfo {

  constructor(
    public ADDRESS_1: string,
    public ADDRESS_2: string,
    public ADDRESS_3: string,
    public ADR_END_DATE_VALID: string,
    public ADR_START_DATE_VALID: string,
    public COMPANY_NAME: string,
    public COUNTRY: string,
    public EMAIL: string,
    public FIRST_NAME: string,
    public LAST_NAME: string,
    public PHONE: string,
    public POST_CODE: string,
    public TOWN: string,
  ) {

  }

  static fromJsonList(array): SupportRequestInfo[] {
    return array.map(json => SupportRequestInfo.fromJson(json))
  }

  static fromJson({ ADDRESS_1, ADDRESS_2, ADDRESS_3, ADR_END_DATE_VALID, ADR_START_DATE_VALID, COMPANY_NAME, COUNTRY, EMAIL, FIRST_NAME, LAST_NAME, PHONE, POST_CODE, TOWN }): SupportRequestInfo {

    debugger;
    return new SupportRequestInfo(
      ADDRESS_1,
      ADDRESS_2,
      ADDRESS_3,
      ADR_END_DATE_VALID,
      ADR_START_DATE_VALID,
      COMPANY_NAME,
      COUNTRY,
      EMAIL,
      FIRST_NAME,
      LAST_NAME,
      PHONE,
      POST_CODE,
      TOWN,
    );
  }

}
