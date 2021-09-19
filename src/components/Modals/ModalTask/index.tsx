import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'semantic-ui-react';

import { ModalForm } from '../../Forms';

function onSubmit(
  name: string,
  description: string,
  dueDate: string,
  tagsList: string[],
  setOpen: any,
  setInitialGet: any,
  setLoading: any,
): void {
  setLoading(true);
  axios.post('/api/tasks', {
    name,
    description,
    dueDate,
    tags: tagsList,
  })
    .then(() => {
      setInitialGet(false);
    })
    .catch(() => {
      setLoading(false);
    });
  setOpen(false);
}

const ModalTask = (props: any): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tagsList, setTagList] = useState<string[]>([]);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={(
        <Button
          floated="right"
          icon
          primary
          size="small"
        >
          Add new task
        </Button>
)}
    >
      <Modal.Header>Add new task</Modal.Header>
      <Modal.Content>
        <ModalForm
          tagsList={tagsList}
          setName={setName}
          setDescription={setDescription}
          setDueDate={setDueDate}
          setTagList={setTagList}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => {
          setTagList([]);
          setOpen(false);
        }}
        >
          Cancel

        </Button>
        <Button
          onClick={() => onSubmit(
            name,
            description,
            dueDate,
            tagsList,
            setOpen,
            props.setInitialGet,
            props.setLoading,
          )}
          positive
        >
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalTask;
