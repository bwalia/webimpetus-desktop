import React, { useState, useEffect } from 'react';
import {
    Button,
    Typography,
    Grid,
    Paper,
    Box,
} from '@mui/material';
import { DateField, Show as RaShow, RichTextField, TextField } from 'react-admin';

const Show = () => {
    const [isTracking, setIsTracking] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;

        if (isTracking) {
            timer = setInterval(() => {
                setElapsedTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => {
            clearInterval(timer);
        };
    }, [isTracking]);

    const startTracking = () => {
        setIsTracking(true);
    };

    const pauseTracking = () => {
        const url = window.location.href; // Get the current URL
        const parts = url.split('/'); // Split the URL by '/'
        const uuidIndex = parts.indexOf('tasks') + 1; // Find the index of 'tasks' and add 1 to get the UUID index

        if (uuidIndex !== 0 && uuidIndex < parts.length) {
            const uuid = parts[uuidIndex];
            localStorage.setItem(uuid, JSON.stringify(elapsedTime));
        }
        setIsTracking(false);
    };

    const stopTracking = () => {
        setIsTracking(false);
        setElapsedTime(0);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <RaShow>
            <Grid container spacing={2} marginBottom={3} padding={3}>
                <Grid item xs={12} justifyContent={"center"} display={"flex"}>
                    <TextField source='name' variant='h4' />
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='body1'>Task Added on</Typography>
                    <DateField source='created_at' variant='h6' label="Task Added on" />
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='body1'>Task Start Date</Typography>
                    <DateField source='start_date' variant='h6' transform={(value: number) => new Date(value * 1000)} />
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='body1'>Task End Date</Typography>
                    <DateField source='end_date' variant='h6' transform={(value: number) => new Date(value * 1000)} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='body1'>Task Description</Typography>
                    <RichTextField source='description' variant='h6' />
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item xs={6}>
                    <Paper elevation={3}>
                        <Box p={2}>
                            <Typography variant="h6" textAlign={"center"}>
                                Time Tracker
                            </Typography>
                            <Typography variant="h4" textAlign={"center"}>
                                {formatTime(elapsedTime)}
                            </Typography>
                            <Button onClick={isTracking ? pauseTracking : startTracking} variant="contained" color={isTracking ? "secondary" : "primary"}>
                                {isTracking ? 'Pause' : 'Start'}
                            </Button>
                            <Button onClick={stopTracking} variant="outlined" color="primary" sx={{ float: "right" }}>
                                Stop
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </RaShow>
    );
}

export default Show