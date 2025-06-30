import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './general.css';

/**
 * A general-purpose input component with a label and optional icon.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.label - The label for the input.
 * @param {string} props.type - The type of the input (e.g., 'text', 'password', 'email').
 * @param {string} props.className - Custom CSS classes for the container.
 * @param {any} props.value - The controlled state value for the input.
 * @param {Function} props.setValue - The state setter function.
 * @param {Object} [props.icon] - Optional FontAwesome icon to display inside the input.
 * @param {Object} [props.inputAttributes] - Optional additional attributes for the input element.
 * @returns {React.Component}
 */
const Input = ({
	label,
	type,
	className,
	value,
	setValue,
	icon,
	inputAttributes,
}) => {
	/**
	 * Handles the onChange event for the input.
	 * Updates the state with the new value from the event target.
	 * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
	 */
	const handleInput = (event) => {
		setValue(event.target.value);
	};

	const hasIcon = icon ? 'input-with-icon' : '';

	return (
		<div className={`input-container ${className || ''}`}>
			<label>{label}</label>
			<div
				style={{
					position: 'relative',
					width: '100%',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				{icon && <FontAwesomeIcon icon={icon} className='input-icon' />}
				<input
					type={type}
					value={value}
					onChange={handleInput}
					className={`input-base ${hasIcon}`}
					{...inputAttributes}
				/>
			</div>
		</div>
	);
};

export default Input;
