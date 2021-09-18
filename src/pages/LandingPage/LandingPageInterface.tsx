import { ILandingForm } from '../../components';

export interface ILandingProps extends ILandingForm {
  redirectLink: string;
  redirectContent: string;
}
