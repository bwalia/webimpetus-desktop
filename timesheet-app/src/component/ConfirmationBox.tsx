import React from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    DialogActions, 
    Button 
} from '@mui/material';

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    innerText: string;
    heading: string;
    openDetails: () => void;
}

const ConfirmationBox: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, innerText, heading, openDetails }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {heading}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {innerText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>No</Button>
                <Button onClick={openDetails} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationBox