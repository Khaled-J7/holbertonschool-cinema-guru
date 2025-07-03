import React from 'react';
import { faUser, faLock, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Input from '../../components/general/Input';
import Button from '../../components/general/Button';
import './auth.css';

/**
 * Renders the registration form fields.
 * @param {Object} props - The component's props.
 * @param {string} props.username - The username state.
 * @param {string} props.password - The password state.
 * @param {Function} props.setUsername - The state setter for username.
 * @param {Function} props.setPassword - The state setter for password.
 * @returns {React.Component}
 */
const Register = ({ username, password, setUsername, setPassword }) => {
	return (
		<>
			<h2 className='auth-title'>Create a new account</h2>
			<Input
				type='text'
				value={username}
				setValue={setUsername}
				icon={faUser}
				inputAttributes={{
					placeholder: 'Username',
					autoComplete: 'username',
				}}
			/>
			<Input
				type='password'
				value={password}
				setValue={setPassword}
				icon={faLock}
				inputAttributes={{
					placeholder: 'Password',
					autoComplete: 'new-password',
				}}
			/>
			<Button
				label='Sign Up'
				className='auth-submit-btn'
				icon={faUserPlus}
				// NOTE: The button's onClick prop is intentionally removed.
				// Its default behavior within a form is to act as a submit button.
			/>
		</>
	);
};

export default Register;
