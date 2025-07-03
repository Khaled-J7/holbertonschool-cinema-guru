import React, { useState } from 'react';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import './auth.css';

/**
 * Main authentication component that handles form submission and API calls.
 * @param {Object} props - Props passed from App.jsx
 * @param {Function} props.setIsLoggedIn - State setter for the parent's login status.
 * @param {Function} props.setUserUsername - State setter for the parent's username.
 * @returns {React.Component}
 */
const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
	const [_switch, setSwitch] = useState(true);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(''); // State to hold error messages

	/**
	 * Handles form submission for both login and registration.
	 * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
	 */
	const handleSubmit = async (event) => {
		event.preventDefault(); // Disable the default form submission behavior
		setError(''); // Clear previous errors

		// Define the API endpoint based on whether we are logging in or registering
		const endpoint = _switch ? '/api/auth/login' : '/api/auth/register';
		const url = `http://localhost:8000${endpoint}`;

		try {
			// Use axios to send a post request
			const response = await axios.post(url, {
				username,
				password,
			});

			// On success, the response will contain the JWT access token
			const { accessToken } = response.data;

			// 1. Store the token in localStorage for session persistence
			localStorage.setItem('accessToken', accessToken);

			// 2. Set the user's username in the App state
			setUserUsername(username);

			// 3. Set the logged-in flag to true to render the Dashboard
			setIsLoggedIn(true);
		} catch (err) {
			// If the API returns an error, display it to the user
			const errorMessage =
				err.response?.data?.message || 'An unexpected error occurred.';
			console.error(`Authentication failed: ${errorMessage}`);
			setError(errorMessage);
		}
	};

	return (
		<div className='auth-page-container'>
			<form className='auth-form' onSubmit={handleSubmit}>
				<header className='auth-header'>
					<button
						type='button'
						className={`auth-header-btn ${_switch ? 'active' : ''}`}
						onClick={() => {
							setSwitch(true);
							setError('');
						}}
					>
						Sign In
					</button>
					<button
						type='button'
						className={`auth-header-btn ${!_switch ? 'active' : ''}`}
						onClick={() => {
							setSwitch(false);
							setError('');
						}}
					>
						Sign Up
					</button>
				</header>

				<section className='auth-body'>
					{_switch ? (
						<Login
							username={username}
							password={password}
							setUsername={setUsername}
							setPassword={setPassword}
						/>
					) : (
						<Register
							username={username}
							password={password}
							setUsername={setUsername}
							setPassword={setPassword}
						/>
					)}
					{error && (
						<p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>
							{error}
						</p>
					)}
				</section>
			</form>
		</div>
	);
};

export default Authentication;
