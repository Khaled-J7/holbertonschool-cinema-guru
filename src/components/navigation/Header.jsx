import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './navigation.css';

/**
 * The main header component for the dashboard.
 * @param {Object} props - The component's props.
 * @param {string} props.userUsername - The username of the logged-in user.
 * @param {Function} props.setIsLoggedIn - The state setter to log the user out.
 * @returns {React.Component}
 */
const Header = ({ userUsername, setIsLoggedIn }) => {
	/**
	 * Handles the logout process.
	 */
	const logout = () => {
		// 1. Remove the access token from localStorage
		localStorage.removeItem('accessToken');
		// 2. Set the isLoggedIn state in the parent component to false
		setIsLoggedIn(false);
	};

	return (
		<nav className='header-nav'>
			<div className='header-title'>Cinema Guru</div>
			<div className='header-user-info'>
				<img
					src='https://picsum.photos/100/100'
					alt='User Avatar'
					className='header-user-avatar'
				/>
				<p className='header-welcome-text'>Welcome, {userUsername}!</p>
				<span className='header-logout' onClick={logout}>
					<FontAwesomeIcon icon={faSignOutAlt} />
					Logout
				</span>
			</div>
		</nav>
	);
};

export default Header;
