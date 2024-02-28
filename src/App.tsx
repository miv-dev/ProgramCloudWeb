import React from 'react';
import {Route, Routes} from 'react-router-dom';
import LoginPage from './pages/Login';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RequireAuth from './helpers/RequireAuth';

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route path='login' element={<LoginPage/>}/>
                    <Route element={<RequireAuth/>}>
                        <Route index element={<HomePage/>}/>

                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
