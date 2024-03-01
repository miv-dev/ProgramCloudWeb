import { useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import React from "react";
import { RectangleStackIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const Header = () => {
    const user = useAppSelector((state) => state.userState.user) 
    const location = useLocation();
    
    
    if(location.pathname.includes("login")){
        return <></>
    }
    
    return (
        <header>
            <nav className="mx-auto px-3 py-1">
                <div className="flex items-center justify-between">
                    <div className="text-gray-800 font-bold text-xl">
                        <a href="#">Program Cloud</a>
                    </div>
                    <div className="hidden md:block">
                        <ul className="flex items-center space-x-1">
                            <li>
                                <button className="middle gap-1 none center flex items-center justify-center rounded-md p-1 font-sans text-xs font-bold uppercase text-slate-400 transition-all hover:bg-slate-500/10 active:bg-slate-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" >
                                    <RectangleStackIcon className="h-6 w-6"/>
                                </button>
                            </li>
                            <li>
                                <button className="middle gap-1 none center flex items-center justify-center rounded-md p-1 font-sans text-xs font-bold uppercase text-slate-400 transition-all hover:bg-slate-500/10 active:bg-slate-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" >
                                    <UserCircleIcon className="h-6 w-6"/>

                                </button>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </header>
    )
}

export default Header