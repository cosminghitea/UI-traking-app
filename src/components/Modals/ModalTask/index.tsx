import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

import { ModalForm } from '../../Forms';

const ModalTask = (): JSX.Element => {
  const [open, setOpen] = React.useState(false);

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
        <ModalForm />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={() => setOpen(false)} positive>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalTask;
