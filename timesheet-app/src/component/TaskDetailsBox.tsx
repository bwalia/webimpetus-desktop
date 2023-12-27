import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';
import { useRecordContext, useDataProvider } from 'react-admin';
import TaskDetailsForm from './TaskDetailsForm';
import { isEmpty } from 'lodash';

interface DetailsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    removeSessionData: () => void;
}
const TaskDetailsBox: React.FC<DetailsDialogProps> = ({ isOpen, onClose, removeSessionData }) => {
    const record = useRecordContext();    
    const dataProvider = useDataProvider();
    // if (!record) return <></>;


    const [formValues, setFormValues] = React.useState({
        task_id: '',
        slip_start_date: '',
        slip_timer_started: '',
        slip_end_date: '',
        slip_timer_end: '',
        slip_hours: '',
        slip_description: '',
        employee_id: '',
        uuid_business_id: '',
        week_no: ''
      });

    const handleTaskSave = async () => {
        try {
            const data = await dataProvider.create('timeslips', { data: formValues });
            if (!isEmpty(data)) {
                removeSessionData();
                onClose();
            }
          } catch (error) {
            console.error('Error creating record:', error);
          }
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please confirm the Task details.
                </DialogContentText>
                <TaskDetailsForm 
                    record={record} 
                    formValues={formValues}
                    setFormValues={setFormValues}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleTaskSave}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default TaskDetailsBox