import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    TextField
} from '@mui/material';
import { useRecordContext } from 'react-admin';
import TaskDetailsForm from './TaskDetailsForm';

interface DetailsDialogProps {
    isOpen: boolean;
    onClose: () => void;
}
const TaskDetailsBox: React.FC<DetailsDialogProps> = ({ isOpen, onClose }) => {
    const record = useRecordContext();
    if (!record) return null;
    console.log({ record });

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please confirm the Task details.
                </DialogContentText>
                <TaskDetailsForm record={record} />

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onClose}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default TaskDetailsBox