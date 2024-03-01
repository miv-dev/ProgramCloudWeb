import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>

            <main className="h-full flex-1">
                <Outlet/>
            </main>
            <footer></footer>
        </>
    );
};


export default Layout;