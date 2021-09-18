import './LandingPage.scss';

import React from 'react';
import {
  Button, Divider, Grid, Segment, Container,
} from 'semantic-ui-react';
import {
  Link,
} from 'react-router-dom';
import { ILandingProps } from './LandingPageInterface';
import { LoginForm } from '../../components';

const LandingPage: React.FC<ILandingProps> = ({
  redirectLink,
  redirectContent,
  submitContent,
  submit,
}: ILandingProps): JSX.Element => (
  <Container textAlign="center" className="loginPageContainer">

    <Segment placeholder>
      <Grid columns={2} relaxed="very" stackable>
        <Grid.Column>
          <LoginForm
            submitContent={submitContent}
            submit={submit}
          />
        </Grid.Column>

        <Grid.Column verticalAlign="middle">
          <Link to={redirectLink}>
            <Button content={redirectContent} icon="signup" size="big" />
          </Link>
        </Grid.Column>
      </Grid>

      <Divider vertical>Or</Divider>
    </Segment>
  </Container>

);

export default LandingPage;
