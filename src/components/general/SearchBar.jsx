import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './general.css';

/**
 * A search bar component.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.title - The controlled state value for the search input.
 * @param {Function} props.setTitle - The state setter function for the search title.
 * @returns {React.Component}
 */
const SearchBar = ({ title, setTitle }) => {
	/**
	 * Handles the onChange event for the search input.
	 * Updates the state with the new value from the event target.
	 * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
	 */
	const handleInput = (event) => {
		setTitle(event.target.value);
	};

	return (
		<div className='search-bar-container'>
			<FontAwesomeIcon icon={faSearch} className='search-bar-icon' />
			<input
				type='text'
				value={title}
				onChange={handleInput}
				className='search-bar-input'
				placeholder='Search Movies'
			/>
		</div>
	);
};

export default SearchBar;
