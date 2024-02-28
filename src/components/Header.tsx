import { useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/store";

const Header = () => {
    const user = useAppSelector((state) => state.userState.user) 
    const location = useLocation();
    
    
    if(location.pathname.includes("login")){
        return <></>
    }
    
    return (
        <header>
            <nav className="mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="text-gray-800 font-bold text-xl">
                        <a href="#">Program Cloud</a>
                    </div>
                    <div className="hidden md:block">
                        <ul className="flex items-center space-x-8">
                            <li>
                                {user?.email ?? ""}
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </header>
    )
}

export default Header