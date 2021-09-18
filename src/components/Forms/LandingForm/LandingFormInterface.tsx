interface ISubmitFunction {
  submit(
    username: string,
    password: string,
    errorState: React.Dispatch<React.SetStateAction<boolean>>,
    errorMessage: React.Dispatch<React.SetStateAction<string>>,
  ): void;
}

export interface ILandingForm extends ISubmitFunction {
  submitContent: string;
}
