import './DashboardTable.scss';

import _ from 'lodash';
import React from 'react';
import axios from 'axios';
import {
  Table, Dropdown, List, Pagination,
} from 'semantic-ui-react';

import { ModalTask } from '../../Modals';

const options = [
  {
    key: 'all', text: 'All', value: 'all',
  },
  { key: 'TODO', text: 'TODO', value: 'TODO' },
  { key: 'IN_PROGRESS', text: 'IN_PROGRESS', value: 'IN_PROGRESS' },
  { key: 'FAILED', text: 'FAILED', value: 'FAILED' },
  { key: 'DONE', text: 'DONE', value: 'DONE' },
];

const statusOptions = [
  { key: 'TODO', text: 'TODO', value: 'TODO' },
  { key: 'IN_PROGRESS', text: 'IN_PROGRESS', value: 'IN_PROGRESS' },
  { key: 'FAILED', text: 'FAILED', value: 'FAILED' },
  { key: 'DONE', text: 'DONE', value: 'DONE' },
];

function onStatusChange(
  id: number,
  name: string,
  status: string,
  setInitialGet: any,
  setLoading: any,
): void {
  setLoading(true);
  axios.put('/api/tasks', {
    id,
    name,
    status,
  })
    .then(() => {
      setInitialGet(false);
    })
    .catch(() => {
      setLoading(false);
    });
}

function exampleReducer(state: any, action: any): any {
  switch (action.type) {
    case 'CHANGE_SORT':

      if (state.column === action.column) {
        action.getDashboardDataSort(
          action.column,
          state.direction === 'ascending' ? 'DESC' : 'ASC',
        );
        return {
          ...state,
          tasks: state.tasks.slice().reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }

      action.getDashboardDataSort(
        action.column,
        'ASC',
      );
      return {
        column: action.column,
        tasks: _.sortBy(state.tasks, [action.column]),
        direction: 'ascending',
      };
    default:
      throw new Error();
  }
}

function TableExampleSortable({
  getDashboardDataFilter,
  getDashboardDataSort,
  setInitialGet,
  setLoading,
  tasks,
  page,
  getDashboardDataPage,
}: any): any {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    tasks,
    direction: null,
  });

  const { column, direction } = state;

  const totalPages = (tasks.length / 10)
  + ((tasks.length + 1) % 10 === 0 ? 0 : 1);

  return (
    <Table sortable celled fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === 'id' ? direction : null}
            onClick={() => dispatch({
              type: 'CHANGE_SORT',
              column: 'id',
              getDashboardDataSort,
            })}
          >
            Task Id
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'name' ? direction : null}
            onClick={() => dispatch({
              type: 'CHANGE_SORT',
              column: 'name',
              getDashboardDataSort,
            })}
          >
            Task name
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'description' ? direction : null}
            onClick={() => dispatch({
              type: 'CHANGE_SORT',
              column: 'description',
              getDashboardDataSort,
            })}
          >
            Task Description
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'dueDate' ? direction : null}
            onClick={() => dispatch({
              type: 'CHANGE_SORT',
              column: 'dueDate',
              getDashboardDataSort,
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
        {tasks.map(({
          id, name, description, dueDate, status, tags,
        }: any) => (
          <Table.Row key={id}>
            <Table.Cell>{id}</Table.Cell>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{description}</Table.Cell>
            <Table.Cell>{dueDate}</Table.Cell>
            <Table.Cell className="DropdownFilterCell">
              {status === 'FAILED' || status === 'DONE' ? status : (
                <Dropdown
                  fluid
                  selection
                  options={statusOptions}
                  additionPosition="top"
                  defaultValue={status}
                  onChange={
                  (event: any, dataClose: any) => onStatusChange(
                    id,
                    name,
                    dataClose.value,
                    setInitialGet,
                    setLoading,
                  )
                  }
                />
              )}
            </Table.Cell>
            <Table.Cell><List items={tags} celled horizontal /></Table.Cell>
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
              onChange={
                (event: any, dataClose: any) => getDashboardDataFilter(
                  dataClose.value,
                )
                }
            />
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="2">
            {!tasks.length ? <div /> : (
              <Pagination
                boundaryRange={0}
                defaultActivePage={1}
                activePage={page + 1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={totalPages}
                onPageChange={(event, data) => {
                  getDashboardDataPage(data.activePage);
                }}
              />
            )}
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="3">
            <ModalTask
              setInitialGet={setInitialGet}
              setLoading={setLoading}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}

export default TableExampleSortable;
