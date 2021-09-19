import './DashboardPage.scss';

import React, { useState } from 'react';
import { get, isEmpty } from 'lodash';
import axios from 'axios';
import {
  Button, Menu, Header,
} from 'semantic-ui-react';
import {
  DashboardTable,
  Loading,
} from '../../components';
import { IDashboardPage } from './IDashboardPage';

function logout(props: IDashboardPage): void {
  axios.get('/api/users/logout');
  props.setIsLoggedIn(false);
  localStorage.removeItem('LOGGED');
}

function getDashboardData(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  setTasks: React.Dispatch<React.SetStateAction<any[]>>,
  page = 0,
  statusFilterBy?: string,
  sortBy?: string,
  sortByOrder?: string,
): void {
  setLoading(true);

  axios.get('/api/tasks', {
    params: {
      page, statusFilterBy, sortBy, sortByOrder,
    },
  })
    .then((res) => {
      setTasks(res.data);
      setLoading(false);
    })
    .catch((error) => {
      if (get(error, 'response.status') === 403) {
        setIsLoggedIn(false);
        localStorage.removeItem('LOGGED');
      }
      setLoading(false);
    });
}

function DashboardPage(props: IDashboardPage): JSX.Element {
  const { setIsLoggedIn } = props;
  const [statusFilterBy, setStatusFilterBy] = useState<string>();
  const [sortByOrder, setSortByOrder] = useState<string>();
  const [sortBy, setSortBy] = useState<string>();
  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<any[]>([]);
  const [initialGet, setInitialGet] = useState(false);
  if (!initialGet) {
    setInitialGet(true);
    getDashboardData(
      setLoading,
      setIsLoggedIn,
      setTasks,
      page,
      statusFilterBy,
      sortBy,
      sortByOrder,
    );
  }

  return (
    <div>
      {loading ? <Loading /> : (
        <Menu size="massive">
          <Menu.Item
            name="FirstName LastName"
          />

          <Menu.Menu position="right">
            <Menu.Item>
              <Button
                primary
                onClick={() => logout(props)}
              >
                LogOut

              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      )}
      <div className="dashboardBody">
        <DashboardTable
          setInitialGet={setInitialGet}
          setLoading={setLoading}
          tasks={tasks}
          page={page}
          getDashboardDataFilter={(value: string) => {
            setStatusFilterBy(value);
            getDashboardData(
              setLoading,
              setIsLoggedIn,
              setTasks,
              page,
              value === 'all' ? undefined : value,
              sortBy,
              sortByOrder,
            );
          }}
          getDashboardDataSort={(
            sortByValue: string, sortByOrderValue: string,
          ) => {
            setSortByOrder(sortByOrderValue);
            setSortBy(sortByValue);
            getDashboardData(
              setLoading,
              setIsLoggedIn,
              setTasks,
              page,
              statusFilterBy,
              sortByValue,
              sortByOrderValue,
            );
          }}
          getDashboardDataPage={(pageValue: number) => {
            setPage(pageValue - 1);
            getDashboardData(
              setLoading,
              setIsLoggedIn,
              setTasks,
              pageValue - 1,
              statusFilterBy,
              sortBy,
              sortByOrder,
            );
          }}
        />
      </div>
    </div>
  );
}

export default DashboardPage;
