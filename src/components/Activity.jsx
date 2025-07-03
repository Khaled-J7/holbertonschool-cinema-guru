import React from 'react';
import './components.css';

/**
 * Formats and displays a single activity item.
 * @param {Object} props - The component's props.
 * @param {Object} props.activity - The activity object from the API.
 * @returns {React.Component}
 */
const Activity = ({ activity }) => {
	// A helper function to format the date nicely
	const formatDate = (dateString) => {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<li className='activity-item'>
			<p>
				<span className='username'>{activity.username}</span> added{' '}
				<span className='movie-title'>{activity.details}</span> to watch later -{' '}
				{formatDate(activity.created_at)}
			</p>
		</li>
	);
};

export default Activity;
