import {useAppSelector} from "../redux/store";
import React from "react";

const ProfilePopover = () => {
    const { user } = useAppSelector(state => state.userState);


    return(
        <>
        </>
        )
}


export default ProfilePopover