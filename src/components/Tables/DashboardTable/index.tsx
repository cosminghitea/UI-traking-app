import './DashboardTable.scss';

import _ from 'lodash';
import React from 'react';
import { Table, Button, Dropdown } from 'semantic-ui-react';

import { ModalTask } from '../../Modals';

const tableData = [
  { name: 'John', age: 15, gender: 'Male' },
  { name: 'Amber', age: 40, gender: 'Female' },
  { name: 'Leslie', age: 25, gender: 'Other' },
  { name: 'Ben', age: 70, gender: 'Male' },
];

const options = [
  {
    key: 'all', text: 'All', value: 'all',
  },
  { key: 'ready', text: 'Ready', value: 'ready' },
  { key: 'inProgress', text: 'In Progress', value: 'inProgress' },
  { key: 'failed', text: 'Failed', value: 'failed' },
  { key: 'done', text: 'Done', value: 'done' },
];

function exampleReducer(state: any, action: any): any {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: 'ascending',
      };
    default:
      throw new Error();
  }
}

function TableExampleSortable(): any {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: tableData,
    direction: null,
  });
  const { column, data, direction } = state;

  return (
    <Table sortable celled fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === 'taskId' ? direction : null}
            onClick={() => dispatch({
              type: 'CHANGE_SORT',
              column: 'taskId',
            })}
          >
            Task Id
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'taskName' ? direction : null}
            onClick={() => dispatch({
              type: 'CHANGE_SORT',
              column: 'taskName',
            })}
          >
            Task name
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'taskDescription' ? direction : null}
            onClick={() => dispatch({
              type: 'CHANGE_SORT',
              column: 'taskDescription',
            })}
          >
            Task Description
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'dueDate' ? direction : null}
            onClick={() => dispatch({
              type: 'CHANGE_SORT',
              column: 'dueDate',
            })}
          >
            Due Date
          </Table.HeaderCell>
          <Table.HeaderCell
            disabled
          >
            Status
          </Table.HeaderCell>
          <Table.HeaderCell
            disabled
          >
            List of tags
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(({ age, gender, name }: any) => (
          <Table.Row key={name}>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{age}</Table.Cell>
            <Table.Cell>{gender}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan="1" className="DropdownFilterCell">
            <Dropdown
              fluid
              selection
              options={options}
              additionPosition="top"
              defaultValue="all"
            />
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="5">
            <ModalTask />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}

export default TableExampleSortable;
