import './DashboardPage.scss';

import React from 'react';
import { Button, Menu } from 'semantic-ui-react';
import { DashboardTable } from '../../components';

function DashboardPage(): JSX.Element {
  return (
    <div>
      <Menu size="massive">
        <Menu.Item
          name="FirstName LastName"
        />

        <Menu.Menu position="right">
          <Menu.Item>
            <Button primary>LogOut</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <div className="dashboardBody">
        <DashboardTable />
      </div>
    </div>
  );
}

export default DashboardPage;
