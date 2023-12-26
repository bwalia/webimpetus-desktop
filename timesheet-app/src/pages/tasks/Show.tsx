import React, { useState, useEffect } from 'react';
import {
    Button,
    Typography,
    Grid,
    Paper,
    Box,
    IconButton
} from '@mui/material';
import {
    DateField,
    Show as RaShow,
    RichTextField,
    TextField,
    useStore,
    useRecordContext,
    useNotify
} from 'react-admin';
import { IndexedDBService } from '../../store';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ConfirmationBox from '../../component/ConfirmationBox';
import TaskDetailsBox from '../../component/TaskDetailsBox';
import dataProvider from '../../dataProvider';

const TaskTitle = () => {
    const record = useRecordContext();
    if (!record) return null;
    return <span>{record.name}</span>;
}

const Show = () => {
    const [isTracking, setIsTracking] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [taskUUID, setTaskUUID] = useState('');
    const [iseTimerStart, setTimerStart] = useStore(`timer.start.${taskUUID}`, {});
    const [timer, setTimer] = useStore(`timer.value.${taskUUID}`, {});
    const [isMenuShow, setMenuShow] = useStore('menu.sidebar.show', true);
    const [sidebar, setSidebar] = useStore(`sidebar.open`, true);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [isDetailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const notify = useNotify();

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const secondsToHMS = (totalSeconds: number): string => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
        return formattedTime;
    }

    const padZero = (num: number): string => {
        return num < 10 ? `0${num}` : num.toString();
    }

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

    useEffect(() => {
        const url = window.location.href;
        const parts = url.split('/');
        const uuidIndex = parts.indexOf('tasks') + 1;
        if (uuidIndex !== 0 && uuidIndex < parts.length) {
            const uuid = parts[uuidIndex];
            setTaskUUID(uuid);
            const dbService = new IndexedDBService("timesheet", 1, "tasks");
            dbService.getItem(uuid).then(resultData => {
                const previousTime = timer[uuid as keyof typeof timer] || resultData?.startingTime || '0';
                setElapsedTime(parseInt(previousTime));
            })
        }
    }, [timer]);

    const startTracking = async () => {
        const previousTime = timer[taskUUID as keyof typeof timer] || '0';
        !elapsedTime && setElapsedTime((prevTime) => prevTime + parseInt(previousTime));
        setIsTracking(true);
        setTimerStart(JSON.stringify({ [taskUUID]: { 'time': Date.now(), 'uuid': taskUUID } }));
        setMenuShow(false);
        setSidebar(false);
    };

    const pauseTracking = async () => {
        const timeObj = {
            [taskUUID]: elapsedTime
        };
        setTimer(timeObj);
        setIsTracking(false);
        setTimerStart({});
        setMenuShow(true);
        setSidebar(true);
        const dbService = new IndexedDBService("timesheet", 1, "tasks");
        const isTimeStarted = await dbService.getItem(taskUUID);
        if (isTimeStarted) {
            await dbService.updateItem({ id: taskUUID, startingDate: isTimeStarted.startingDate, startingTime: elapsedTime });
        } else {
            await dbService.addItem({ id: taskUUID, startingDate: new Date, startingTime: elapsedTime });
        }
    };

    const finishTracking = () => {
        setConfirmationDialogOpen(true);
    };

    const removeSessionData = async () => {
        const timeObj = {};
        setTimer(timeObj);
        setIsTracking(false);
        setElapsedTime(0);
        setTimerStart({});
        setMenuShow(true);
        setSidebar(true);
        const dbService = new IndexedDBService("timesheet", 1, "tasks");
        await dbService.deleteItem(taskUUID);
        await dataProvider.update(taskUUID, {
            id: taskUUID,
            data: { status: "inReview" },
            previousData: {}
        });
        notify('Record updated successfully');
    }

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log("i'm ready");
        document.addEventListener("backbutton", onBackKeyDown, false);
    }

    function onBackKeyDown() {
        console.log("yeaaaaaahhhhhhh");

    }

    const handleDetailsOpenDialog = () => {
        setDetailsDialogOpen(true)
    }

    const handleDetailsCloseDialog = () => {
        setDetailsDialogOpen(false);
        setConfirmationDialogOpen(false);
    };

    const handleConfirmationCloseDialog = () => {
        setConfirmationDialogOpen(false);
    };

    return (
        <RaShow title={<TaskTitle />}>
            <Grid container spacing={2} marginBottom={3} padding={3}>
                {!isTracking && (
                    <IconButton aria-label="delete" onClick={() => history.back()}>
                        <ArrowBackIcon />
                    </IconButton>
                )}
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
                                {secondsToHMS(elapsedTime)}
                            </Typography>
                            <Button 
                                onClick={isTracking ? pauseTracking : startTracking} 
                                variant="contained" 
                                color={isTracking ? "secondary" : "primary"}
                                sx={ isTracking ? {margin: 'auto', display: 'flex'} : {}}
                            >
                                {isTracking ? 'Pause' : 'Start'}
                            </Button>
                            {!isTracking && (
                                <Button onClick={finishTracking} variant="outlined" color="primary" sx={{ float: "right" }}>
                                    Finish
                                </Button>
                            )}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            <ConfirmationBox
                isOpen={isConfirmationDialogOpen}
                onClose={handleConfirmationCloseDialog}
                innerText='Do you want to create an timeslip'
                heading='Confirmation'
                openDetails={handleDetailsOpenDialog}
            />
            <TaskDetailsBox
                isOpen={isDetailsDialogOpen}
                onClose={handleDetailsCloseDialog}
                removeSessionData={removeSessionData}
            />
        </RaShow>
    );
}

export default Show