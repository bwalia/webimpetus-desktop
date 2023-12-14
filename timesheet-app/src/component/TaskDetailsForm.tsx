import React, { useState, useEffect } from 'react';
import { TextField, Grid } from '@mui/material';
import { IndexedDBService } from '../store';

interface TaskDetailsFormProps {
    record: any
}

interface TaskDataProps {
    id: string;
    startingDate: string
    startingTime: number
}

const TaskDetailsForm: React.FC<TaskDetailsFormProps> = ({ record }) => {
    const [savedData, setSavedData] = useState<TaskDataProps>();
    const [startDate, setStartDate] = useState<any>();
    const [startTime, setStartTime] = useState<any>(); 
    const [endDate, setEndDate] = useState<any>();
    const [endTime, setEndTime] = useState<any>(); 
    const [spentTime, setSpentTime] = useState<any>(); 

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const url = window.location.href;
        const parts = url.split('/');
        const uuidIndex = parts.indexOf('tasks') + 1;

        if (uuidIndex !== 0 && uuidIndex < parts.length) {
            const uuid = parts[uuidIndex];
            const dbService = new IndexedDBService("timesheet", 1, "tasks");
            dbService.getItem(uuid).then((taskData: any) => {
                setSavedData(taskData);
                const startedDate = taskData.startingDate;
                let dateObj = new Date(startedDate).toLocaleString();
                let dateTime = dateObj.split(",");
                setStartDate(dateTime[0]);
                setStartTime(dateTime[1]);
                setSpentTime(formatTime(taskData?.startingTime))
            });

            let endDateObj = new Date().toLocaleString();
            let endDateTime = endDateObj.split(",");
            setEndDate(endDateTime[0]);
            setEndTime(endDateTime[1]);
        }
    }, [])
    return (
        <Grid container spacing={2}>
            <Grid item sm={12}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Task name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={record.name}
                />
            </Grid>
            <Grid item sm={6}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="taskStartDate"
                    label="Task Start Date"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={startDate}
                />
            </Grid>
            <Grid item sm={6}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="taskStartTime"
                    label="Task Start Time"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={startTime}
                />
            </Grid>
            <Grid item sm={6}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="taskEndDate"
                    label="Task End Date"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={endDate}
                />
            </Grid>
            <Grid item sm={6}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="taskEndTime"
                    label="Task End Time"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={endTime}
                />
            </Grid>
            <Grid item sm={12}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="taskSpentTime"
                    label="Task Spent Time"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={spentTime}
                />
            </Grid>
            <Grid item sm={12}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="taskDescription"
                    label="Task Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    multiline
                    rows={3}
                    required
                />
            </Grid>
        </Grid>
    )
}

export default TaskDetailsForm