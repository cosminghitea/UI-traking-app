import './LandingForm.scss';

import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import validator from 'validator';
import { ILandingForm } from './LandingFormInterface';

function handleOnChange(
  value: string,
  setState: React.Dispatch<React.SetStateAction<string>>,
): void {
  setState(value);
}

function onSubmit(
  username: string,
  password: string,
  setStateUsernameError: React.Dispatch<React.SetStateAction<boolean>>,
  setStatePasswordError: React.Dispatch<React.SetStateAction<boolean>>,
  setPrimaryError: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  submit: (
    username: string,
    password: string,
    errorState: React.Dispatch<React.SetStateAction<boolean>>,
    errorMessage: React.Dispatch<React.SetStateAction<string>>,
  ) => void,
): void {
  const checkUsername = username.length > 0
    && validator.isAlphanumeric(username);
  const checkPassword = validator.isStrongPassword(password);

  setStateUsernameError(!checkUsername);
  setStatePasswordError(!checkPassword);

  if (checkUsername && checkPassword) {
    submit(username, password, setPrimaryError, setErrorMessage);
  }
}

const LoginForm: React.FC<ILandingForm> = ({
  submitContent,
  submit,
}: ILandingForm): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [primaryError, setPrimaryError] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Form>
      <Form.Input
        error={usernameError
          && {
            content:
            `Username must have:
            - One letter
            - One number`,
            pointing: 'below',
          }}
        icon="user"
        iconPosition="left"
        label="Username"
        placeholder="Username"
        id="username"
        value={username}
        onChange={(event, data) => handleOnChange(data.value, setUsername)}
      />
      <Form.Input
        error={passwordError && {
          content:
          `Password must have at least:
          - Have at least 8 character
          - One letter in lower case
          - One letter in upper case
          - One number
          - One special character `,
          pointing: 'below',
        }}
        icon="lock"
        iconPosition="left"
        label="Password"
        type="password"
        id="password"
        value={password}
        onChange={(event, data) => handleOnChange(data.value, setPassword)}
      />

      <Button
        onClick={() => onSubmit(
          username,
          password,
          setUsernameError,
          setPasswordError,
          setPrimaryError,
          setErrorMessage,
          submit,
        )}
        content={submitContent}
        primary
      />
      <Message
        error={primaryError}
        header="Action failed"
        content={errorMessage}
      />
    </Form>
  );
};

export default LoginForm;
