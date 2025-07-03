import React, { useState } from 'react';
import './movies.css';

const Tag = ({ genre, genres, setGenres }) => {
	const [selected, setSelected] = useState(genres.includes(genre));

	const handleTag = () => {
		if (selected) {
			// Remove the genre from the list
			setGenres(genres.filter((g) => g !== genre));
		} else {
			// Add the genre to the list
			setGenres([...genres, genre]);
		}
		// Toggle the selected state
		setSelected(!selected);
	};

	return (
		<li
			className={`genre-tag ${selected ? 'selected' : ''}`}
			onClick={handleTag}
		>
			{genre}
		</li>
	);
};

export default Tag;
