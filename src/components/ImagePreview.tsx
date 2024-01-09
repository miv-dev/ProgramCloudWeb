import {Box, Button, IconButton, Modal, Paper, Typography} from "@mui/material";
import React from "react";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

interface ImagePreviewProps {
    url: string,
    alt: string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '10%',
    left: '10%',
    right: '10%',
    bottom: '10%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ImagePreview = ({url, alt}: ImagePreviewProps) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    
    return(
        <>
            <Paper sx={{display: 'flex', width: '100%', flex:1, position: 'relative'}}>
                <img src={url} style={{height: '100%', width: '100%', objectFit: 'contain'}} width="100%" height="100%" alt={alt}/>
                <IconButton sx={{position:'absolute', right: '20px', bottom: '20px'}} onClick={handleOpen}>
                    <ZoomOutMapIcon/>
                </IconButton>
            </Paper>
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <img src={url} style={{height: '100%', width: '100%', objectFit: 'contain'}} width="100%" height="100%" alt={alt}/>

                </Box>
            </Modal>
        </>
    )
}

export default ImagePreview