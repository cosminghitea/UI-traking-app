import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import './ModalForm.scss';

import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import {
  Form, TextArea, List, Button,
} from 'semantic-ui-react';
import SemanticDatePicker from 'react-semantic-ui-datepickers';
import { IFormFieldError } from './ModalFormInterface';

const tagInput = (
  value: string,
  setState: React.Dispatch<React.SetStateAction<string>>,
): void => {
  setState(value);
};

const addTag = (
  tagValue: string,
  tagsList: string[],
  setErrorTag: React.Dispatch<React.SetStateAction<IFormFieldError | boolean>>,
  setTagValue: React.Dispatch<React.SetStateAction<string>>,
  setTagList: React.Dispatch<React.SetStateAction<string[]>>,
): void => {
  if (isEmpty(tagValue)) {
    setErrorTag({
      content: 'Please enter a valid email address',
    });
    return;
  }
  if (tagsList.includes(tagValue)) {
    setErrorTag({
      content: 'Tag already added',
    });
    return;
  }
  setErrorTag(false);
  setTagList((arr) => [...arr, tagValue]);
  setTagValue('');
};

const ModalForm = (): JSX.Element => {
  const [tagValue, setTagValue] = useState('');
  const [tagsList, setTagList] = useState<string[]>([]);
  const [errorTag, setErrorTag] = useState<IFormFieldError | boolean>(false);

  return (
    <Form error>
      <Form.Input label="Name" placeholder="Set name for task" />
      <Form.Field
        id="modal-form-description"
        control={TextArea}
        label="Description"
        placeholder="Description"
      />
      <Form.Field
        id="modal-form-description"
        control={SemanticDatePicker}
        label="Due Date"
        placeholder="Due Date"
      />
      <Form.Group>
        <Form.Input
          error={errorTag}
          label="List of tags"
          placeholder="Optional set list of tags"
          onChange={(event, data) => tagInput(data.value, setTagValue)}
        />
        <Button
          positive
          className="ModalFormButton"
          onClick={() => addTag(
            tagValue,
            tagsList,
            setErrorTag,
            setTagValue,
            setTagList,
          )}
        >
          Add new tag
        </Button>
      </Form.Group>
      <List items={tagsList} celled horizontal />
    </Form>
  );
};

export default ModalForm;
