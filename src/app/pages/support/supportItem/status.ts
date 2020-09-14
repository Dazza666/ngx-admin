export class Status {

  constructor(
    public notes: string,
    public state: string,
    public submissionState: string,
  ) {

  }

  static fromJsonList(array): Status[] {
    return array.map(json => Status.fromJson(json))
  }

  static fromJson({ notes, state, submissionState }): Status {

    debugger;
    return new Status(
      notes,
      state,
      submissionState,
    );
  }

}
