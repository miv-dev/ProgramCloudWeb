import {useAppSelector} from "../redux/store";
import {IconButton, Popover, Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from "react";

const ProfilePopover = () => {
    const { user } = useAppSelector(state => state.userState);

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'user-profile' : undefined;


    return(
        <>

        <IconButton
            aria-owns={id}
            aria-haspopup="true"
            onClick={handleClick}
            >
            <AccountCircleIcon
            />
        </IconButton>

        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'bottom',horizontal: 'center',
            }}
            transformOrigin={{
            vertical: 'top',
                horizontal: 'right',
            }}
            onClose={handleClose}
            disableRestoreFocus
            >
            <Typography sx={{ p: 2 }}>{user?.email?? "Undefined"}</Typography>
        </Popover>

        </>
        )
}


export default ProfilePopover