import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../../components/navigation/Header';
import SideBar from '../../components/navigation/SideBar';
import HomePage from './HomePage';
import Favorites from './Favorites';
import WatchLater from './WatchLater';
import './dashboard.css';

const Dashboard = ({ userUsername, setIsLoggedIn }) => {
	return (
		<div className='dashboard-container'>
			<SideBar />
			<main className='dashboard-content'>
				<Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
				<Routes>
					<Route path='/home' element={<HomePage />} />
					<Route path='/favorites' element={<Favorites />} />
					<Route path='/watchlater' element={<WatchLater />} />
					<Route path='*' element={<Navigate to='/home' />} />
				</Routes>
			</main>
		</div>
	);
};

export default Dashboard;
