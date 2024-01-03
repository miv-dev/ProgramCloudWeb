import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
      <>
      <header></header>
      <Outlet />
      <footer></footer>
      </>
    );
  };
  
  export default Layout;