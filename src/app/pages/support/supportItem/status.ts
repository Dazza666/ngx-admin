export class status {

  constructor(
    public notes: string,
    public state: string,
    public submissionState: string,
  ) {

  }

  static fromJsonList(array): status[] {
    return array.map(json => status.fromJson(json))
  }

  static fromJson({ notes, state, submissionState }): status {

    debugger;
    return new status(
      notes,
      state,
      submissionState,
    );
  }

}
