import React, { useState, useEffect } from 'react';
import { Box, Paper, Grid, LinearProgress, Typography } from '@mui/material';

const DashboardMid = (props: any) => {
    const [taskStatus, setTaskStatus] = useState({
        assignedTasks: 0,
        allBusinessTasks: 0,
        allBusinessProjects: 0,
        assignedProjects: 0,
        assignedAverage: 0,
        allProjectsAverage: 0
    });
    useEffect(() => {
        setTaskStatus(props?.taskStatus);
    }, [props]);
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant='h5'>Things You need to see</Typography>
                <Box
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'background.default',
                        display: 'grid',
                        gridTemplateColumns: { md: '1fr 1fr' },
                        gap: 2,
                    }}
                >
                    <Paper elevation={4} sx={{ padding: "25px" }}>
                        <div className="dashboard-mid-paper">
                            <div className="mid-paper-header">
                                Total Assigned Tasks
                            </div>
                            <h2 className="mid-paper-footer">
                                {taskStatus?.assignedTasks}
                            </h2>
                        </div>
                    </Paper>
                    <Paper elevation={4} sx={{ padding: "25px" }}>
                        <div className="dashboard-mid-paper">
                            <div className="mid-paper-header">
                                Total Business Task
                            </div>
                            <h2 className="mid-paper-footer">
                                {taskStatus?.allBusinessTasks}
                            </h2>
                        </div>
                    </Paper>
                    <Paper elevation={4} sx={{ padding: "25px" }}>
                        <div className="dashboard-mid-paper">
                            <div className="mid-paper-header">
                                All Business Projects
                            </div>
                            <h2 className="mid-paper-footer">
                                {taskStatus?.allBusinessProjects}
                            </h2>
                        </div>
                    </Paper>
                    <Paper elevation={4} sx={{ padding: "25px" }}>
                        <div className="dashboard-mid-paper">
                            <div className="mid-paper-header">
                                All Assigned Projects
                            </div>
                            <h2 className="mid-paper-footer">
                                {taskStatus?.assignedProjects}
                            </h2>
                        </div>
                    </Paper>
                </Box>
            </Grid>
            <Grid item xs={12} sx={{padding: '30px'}}>
                <Typography variant='h5'>Assigned Projects Progress</Typography>
                <Box
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        width: '100%'
                    }}
                >
                    <LinearProgress 
                        variant="determinate" 
                        value={taskStatus?.assignedAverage} 
                        sx={{ height: "30px", borderRadius: '10px' }}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} sx={{padding: '30px'}}>
                <Typography variant='h5'>All Projects Progress</Typography>
                <Box
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        width: '100%'
                    }}
                >
                    <LinearProgress 
                        variant="determinate" 
                        value={taskStatus?.allProjectsAverage} 
                        sx={{ height: "30px", borderRadius: '10px' }}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}

export default DashboardMid