import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import DashboardHeader from './component/DashboardHeader';
import './dashboard.css';
import DashboardMid from './component/DashboardMid';
import dataProvider from './dataProvider';

const Dashboard: React.FC = () => {
  const [taskStatus, setTaskStatus] = useState();
  useEffect(() => {
    dataProvider.getList("tasks-status", {
      pagination: { page: 1, perPage: 1000 },
      sort: { field: "name", order: 'ASC' },
      filter: {}
    }).then((taskStatus: any) => {
      console.log({ taskStatus });
      setTaskStatus(taskStatus?.data);
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DashboardHeader taskStatus={taskStatus} />
      </Grid>
      <Grid item xs={12}>
        <DashboardMid taskStatus={taskStatus} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
