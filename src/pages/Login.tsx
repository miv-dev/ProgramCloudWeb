import {useLoginUserMutation} from '../redux/api/authApi';
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import React, {FormEvent, FormEventHandler, useEffect, useState} from 'react';


const LoginPage = () => {

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');


    const [loginUser, {isLoading, isError, error, isSuccess}] =
        useLoginUserMutation();

    const navigate = useNavigate();
    const location = useLocation();

    const from = ((location.state as any)?.from.pathname as string) || '/';


    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(event.target.value);
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(event.target.value);
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        loginUser({email: emailValue, password: passwordValue})
    };

    useEffect(() => {
        if (isSuccess) {
            navigate(from);
        }
        if (isError) {
            if (Array.isArray((error as any).data.error)) {
                (error as any).data.error.forEach((el: any) =>
                    console.log(el.message)
                );
            } else {

            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    return (
        <section className="grid min-h-screen place-items-center bg-slate-500 p-16">
            <div className="w-72 rounded-md bg-slate-300 p-4 pt-0 shadow-lg">
                <header className="flex h-16 items-center justify-between font-bold text-slate-950">
                    <span>Login</span>
                </header>
                <form className="grid gap-3" onSubmit={handleSubmit}>
                    <input
                        onChange={handleEmailChange}
                        className="h-10 rounded-sm bg-slate-100/50 px-2 text-slate-950 placeholder:text-slate-600/80 focus:outline-none focus:ring focus:ring-slate-400"
                        type="text"
                        placeholder="Enter your email"/>
                    <input
                        onChange={handlePasswordChange}
                        className="h-10 rounded-sm bg-slate-100/50 px-2 text-slate-950 placeholder:text-slate-600/80 focus:outline-none focus:ring focus:ring-slate-400"
                        type="password"
                        placeholder="Enter your password"/>
                    <button
                        className="flex h-10 items-center justify-between rounded-sm bg-slate-700 px-2 text-slate-100 transition-colors duration-300 hover:bg-slate-800 focus:outline-none focus:ring focus:ring-slate-400"
                        type="submit">
                        <span>Sign In</span>
                        <span>
                            {isLoading ?
                                <svg fill='none' className="w-6 h-6 animate-spin" viewBox="0 0 32 32"
                                     xmlns='http://www.w3.org/2000/svg'>
                                    <path clipRule='evenodd'
                                          d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                                          fill='currentColor' fillRule='evenodd'/>
                                </svg>
                                :
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                     className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                                </svg>
                            }

                        </span>
                    </button>
                </form>
            </div>
        </section>
    )
};

export default LoginPage;

