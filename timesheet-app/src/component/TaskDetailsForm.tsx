import React, { useState, useEffect } from 'react';
import { TextField, Grid } from '@mui/material';
import { IndexedDBService } from '../store';

interface TaskDetailsFormProps {
    record: any;
    formValues: any;
    setFormValues: any;
}

interface TaskDataProps {
    id: string;
    startingDate: string
    startingTime: number
}

const TaskDetailsForm: React.FC<TaskDetailsFormProps> = ({ record, formValues, setFormValues }) => {
    const [savedData, setSavedData] = useState<TaskDataProps>();
    const [startDate, setStartDate] = useState<any>('0');
    const [startTime, setStartTime] = useState<any>('0');
    const [endDate, setEndDate] = useState<any>();
    const [endTime, setEndTime] = useState<any>();
    const [spentTime, setSpentTime] = useState<any>('0');

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
    const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [field]: event.target.value });
    };

    const getCurrentWeekNumber = (): number => {
        const now: Date = new Date();
        const startOfYear: Date = new Date(now.getFullYear(), 0, 1);
        const timeDifference: number = now.getTime() - startOfYear.getTime();
        const weekNumber: number = Math.ceil(timeDifference / (7 * 24 * 60 * 60 * 1000));
        return weekNumber;
    }

    const dateToTimestamp = (dateString: string): any | null => {
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);
            return new Date(year, month, day);
        }
        // Return null if the date string is invalid
        return null;
    }

    const convertTimeFormat = (timeString: string): string => {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        const date = new Date(1970, 0, 1, hours, minutes, seconds);
        const formattedTime = date.toLocaleTimeString('en-US', { hour12: true });
        return formattedTime;
    }

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
                setSpentTime(secondsToHMS(taskData?.startingTime));
            });

            let endDateObj = new Date().toLocaleString();
            let endDateTime = endDateObj.split(",");
            setEndDate(endDateTime[0]);
            setEndTime(endDateTime[1]);
        }
    }, []);

    useEffect(() => {
        let employee: any = localStorage.getItem("user") || JSON.stringify({ id: 0, uuid_business_id: "" });
        employee = JSON.parse(employee);
        const currentWeekNumber: number = getCurrentWeekNumber();
        const startDateTimestamp = startDate && dateToTimestamp(startDate);
        const formattedStartTime = startTime && convertTimeFormat(startTime);
        const endDateTimestamp = endDate && dateToTimestamp(endDate);
        const formattedEndTime = endTime && convertTimeFormat(endTime);

        setFormValues({
            ...formValues,
            'task_id': record.internal_id,
            'slip_start_date': startDateTimestamp,
            'slip_timer_started': formattedStartTime,
            'slip_end_date': endDateTimestamp,
            'slip_timer_end': formattedEndTime,
            'slip_hours': spentTime,
            'employee_id': employee?.user?.id,
            'uuid_business_id': employee?.user?.uuid_business_id,
            'week_no': currentWeekNumber
        });
    }, [startDate, startTime, endDate, endTime, spentTime])
    return (
        <Grid container spacing={2}>
            <Grid item sm={12}>
                <TextField
                    margin="dense"
                    id="taskName"
                    label="Task name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={record.name}
                    disabled
                />
            </Grid>
            <Grid item sm={6}>
                <TextField
                    margin="dense"
                    id="taskStartDate"
                    label="Task Start Date"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={startDate}
                    disabled
                />
            </Grid>
            <Grid item sm={6}>
                <TextField
                    margin="dense"
                    id="taskStartTime"
                    label="Task Start Time"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={startTime}
                    disabled
                />
            </Grid>
            <Grid item sm={6}>
                <TextField
                    margin="dense"
                    id="taskEndDate"
                    label="Task End Date"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={endDate}
                    disabled
                />
            </Grid>
            <Grid item sm={6}>
                <TextField
                    margin="dense"
                    id="taskEndTime"
                    label="Task End Time"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={endTime}
                    disabled
                />
            </Grid>
            <Grid item sm={12}>
                <TextField
                    margin="dense"
                    id="taskSpentTime"
                    label="Task Spent Time"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={spentTime}
                    disabled
                />
            </Grid>
            <Grid item sm={12}>
                <TextField
                    margin="dense"
                    id="taskDescription"
                    label="Task Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    multiline
                    rows={3}
                    required
                    value={formValues.taskDescription}
                    onChange={handleInputChange('slip_description')}
                />
            </Grid>
        </Grid>
    )
}

export default TaskDetailsForm