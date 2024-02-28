<<<<<<< Updated upstream
import {IconButton, Typography} from "@mui/material";
import { Outlet } from "react-router-dom";
import ProfilePopover from "./ProfilePopover";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HistoryIcon from "@mui/icons-material/History";

const Layout = () => {
    return (
      <>
      <header>
=======
import {Outlet} from "react-router-dom";
import Header from "./Header";

const Layout = () => {
    return (
        <>
            <Header/>
            <main className="h-full flex-1">
                <Outlet/>
            </main>
            <footer></footer>
        </>
    );
};
>>>>>>> Stashed changes

        <nav className="px-6 py-4 flex justify-between items-center">
        <Typography
          variant="h6"
          component="div"
          sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
          >
          PROGRAM CLOUD
        </Typography>
        <div className={"flex gap-4"}>
          <ProfilePopover/>
          <IconButton>
            <NotificationsNoneIcon/>
          </IconButton>
          <IconButton>
            <HistoryIcon/>
          </IconButton>

        </div>
        </nav>
      </header>
      <Outlet />
      <footer></footer>
      </>
    );
  };
  
  export default Layout;