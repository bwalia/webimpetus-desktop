import React from 'react';
import { Grid } from '@mui/material';
import DashboardHeader from './component/DashboardHeader';
import './dashboard.css';

const Dashboard: React.FC = () => {

  return (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <DashboardHeader />
        </Grid>
    </Grid>
  );
};

export default Dashboard;
