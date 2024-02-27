import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <header className="h-10"></header>
            <main className="h-full">
                <Outlet/>
            </main>
            <footer></footer>
        </>
    );
};

export default Layout;