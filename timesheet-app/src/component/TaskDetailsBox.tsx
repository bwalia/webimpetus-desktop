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
import { useRecordContext, useDataProvider } from 'react-admin';
import TaskDetailsForm from './TaskDetailsForm';

interface DetailsDialogProps {
    isOpen: boolean;
    onClose: () => void;
}
const TaskDetailsBox: React.FC<DetailsDialogProps> = ({ isOpen, onClose }) => {
    const record = useRecordContext();
    if (!record) return null;
    const dataProvider = useDataProvider();

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
            const { data } = await dataProvider.create('timeslips', { data: formValues });
        
            // Handle success, e.g., show a success message or navigate to the new record
            console.log('New Record Created:', data);
          } catch (error) {
            // Handle error, e.g., show an error message
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