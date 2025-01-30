import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';

type ErrorSnackbarProps = {
    error: string;
};

export default function ErrorSnackbar(props: ErrorSnackbarProps) {
    const { error } = props;

    const [open, setOpen] = useState<boolean>(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    );
}
