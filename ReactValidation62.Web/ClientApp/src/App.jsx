import React from 'react';
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Layout from './Layout';
import Home from './Home';
import MyBookmarks from './MyBookmarks';
import AddBookmark from './AddBookmark';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
import { ContextComponent } from './Context';
import PrivateRoute from './PrivateRoute';

const App = () => {
    return (
        <ContextComponent>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/signup' element={<Signup />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/addbookmark' element={
                        <PrivateRoute>
                            <AddBookmark />
                        </PrivateRoute>} />
                    <Route exact path='/mybookmarks' element={
                        <PrivateRoute>
                            <MyBookmarks />
                        </PrivateRoute>} />
                    <Route exact path='/logout' element={
                        <PrivateRoute>
                            <Logout />
                        </PrivateRoute>} />
                </Routes>
            </Layout>
        </ContextComponent>
    );
};
export default App;