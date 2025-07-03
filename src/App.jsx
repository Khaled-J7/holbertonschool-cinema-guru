import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Authentication from './routes/auth/Authentication';
import Dashboard from './routes/dashboard/Dashboard';
import './App.css';
import 'normalize.css';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userUsername, setUserUsername] = useState('');

	useEffect(() => {
		const checkUserSession = async () => {
			const accessToken = localStorage.getItem('accessToken');
			if (accessToken) {
				try {
					const response = await axios.post(
						'http://localhost:8000/api/auth/',
						{},
						{ headers: { Authorization: `Bearer ${accessToken}` } }
					);
					if (response.status === 200) {
						setIsLoggedIn(true);
						setUserUsername(response.data.username);
					}
				} catch (error) {
					console.error('Session validation failed:', error);
					localStorage.removeItem('accessToken');
				}
			}
		};
		checkUserSession();
	}, []);

	return (
		<BrowserRouter>
			{' '}
			{/* <-- WRAP THE ENTIRE APP */}
			<div className='App'>
				{isLoggedIn ? (
					<Dashboard
						userUsername={userUsername}
						setIsLoggedIn={setIsLoggedIn}
					/>
				) : (
					<Authentication
						setIsLoggedIn={setIsLoggedIn}
						setUserUsername={setUserUsername}
					/>
				)}
			</div>
		</BrowserRouter> /* <-- END WRAPPER */
	);
}

export default App;
