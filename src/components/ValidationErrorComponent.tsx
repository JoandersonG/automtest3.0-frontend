import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import React from "react";

export default function ValidationErrorSnackbar(props: {open: boolean, message: string, changeOpenState: any}) {
    
    const [open, setOpen] = useState(props.open);

    useEffect(() => {
        setOpen(props.open);
    }, [props.open])

    return (
        <Snackbar 
            open={open}
            autoHideDuration={6000} 
            onClose={() => 1} 
            message={props.message} 
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} 
            action={<React.Fragment>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={() => props.changeOpenState()}
                        >
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
            }
        />
    )
}