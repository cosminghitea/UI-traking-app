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
  tags: string,
  tagsList: string[],
  setErrorTag: React.Dispatch<React.SetStateAction<IFormFieldError | boolean>>,
  setTagValue: React.Dispatch<React.SetStateAction<string>>,
  setTagList: React.Dispatch<React.SetStateAction<string[]>>,
): void => {
  if (isEmpty(tags)) {
    setErrorTag({
      content: 'Please enter a valid tag',
    });
    return;
  }
  if (tagsList.includes(tags)) {
    setErrorTag({
      content: 'Tag already added',
    });
    return;
  }
  setErrorTag(false);
  setTagList((arr) => [...arr, tags]);
  setTagValue('');
};

function onChangeData(
  value: string,
  setState: React.Dispatch<React.SetStateAction<string>>,
): void {
  setState(value);
}

const ModalForm = (props: any): JSX.Element => {
  const {
    tagsList, setName, setDescription, setDueDate, setTagList,
  } = props;
  const [tags, setTagValue] = useState('');
  const [errorTag, setErrorTag] = useState<IFormFieldError | boolean>(false);

  return (
    <Form error>
      <Form.Input
        id="name"
        label="Name"
        placeholder="Set name for task"
        onChange={(event, data) => {
          onChangeData(data.value, setName);
        }}
      />
      <Form.Field
        id="description"
        control={TextArea}
        label="Description"
        placeholder="Description"
        onChange={(event: any, data: any) => {
          onChangeData(data.value, setDescription);
        }}
      />
      <Form.Field
        id="dueDate"
        control={SemanticDatePicker}
        label="Due Date"
        placeholder="Due Date"
        onChange={(event: any, data: any) => {
          onChangeData(data.value, setDueDate);
        }}
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
            tags,
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
