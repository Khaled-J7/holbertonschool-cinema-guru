import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './general.css';

/**
 * A general-purpose button component with a label and optional icon.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.label - The text to display on the button.
 * @param {string} props.className - Custom CSS classes for the button.
 * @param {Function} props.onClick - The function to call when the button is clicked.
 * @param {Object} [props.icon] - Optional FontAwesome icon to display inside the button.
 * @returns {React.Component}
 */
const Button = ({ label, className, onClick, icon }) => {
	return (
		<button onClick={onClick} className={`button-base ${className || ''}`}>
			{icon && <FontAwesomeIcon icon={icon} className='button-icon' />}
			<span>{label}</span>
		</button>
	);
};

export default Button;
