import React from 'react';
import './general.css';

/**
 * A general-purpose select dropdown component with a label.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.label - The label for the select input.
 * @param {Array<Object>} props.options - An array of options for the select dropdown. Each object should have 'value' and 'label' keys.
 * @param {string} props.className - Custom CSS classes for the container.
 * @param {any} props.value - The controlled state value for the select.
 * @param {Function} props.setValue - The state setter function.
 * @returns {React.Component}
 */
const SelectInput = ({ label, options, className, value, setValue }) => {
	/**
	 * Handles the onChange event for the select input.
	 * Updates the state with the new value from the event target.
	 * @param {React.ChangeEvent<HTMLSelectElement>} event - The select change event.
	 */
	const handleSelect = (event) => {
		setValue(event.target.value);
	};

	return (
		<div className={`input-container select-container ${className || ''}`}>
			<label>{label}</label>
			<select value={value} onChange={handleSelect} className='input-base'>
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectInput;
