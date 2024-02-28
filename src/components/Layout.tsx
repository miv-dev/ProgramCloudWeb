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


export default Layout;