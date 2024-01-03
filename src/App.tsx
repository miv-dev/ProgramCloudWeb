import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />}/>
        </Route>
        <Route path='login' element={ <LoginPage/> } />
      </Routes>
    </>
  );
}

export default App;
