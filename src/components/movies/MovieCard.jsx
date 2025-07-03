import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import './movies.css';

const MovieCard = ({ movie }) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [isWatchLater, setIsWatchLater] = useState(false);

	// This effect checks if the movie is in the user's lists when the component mounts
	useEffect(() => {
		const checkLists = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken');
				const headers = { Authorization: `Bearer ${accessToken}` };

				// Check favorites
				const favResponse = await axios.get(
					'http://localhost:8000/api/titles/favorite/',
					{ headers }
				);
				if (
					favResponse.data.some((favMovie) => favMovie.imdbId === movie.imdbId)
				) {
					setIsFavorite(true);
				}

				// Check watch later
				const watchResponse = await axios.get(
					'http://localhost:8000/api/titles/watchlater/',
					{ headers }
				);
				if (
					watchResponse.data.some(
						(watchMovie) => watchMovie.imdbId === movie.imdbId
					)
				) {
					setIsWatchLater(true);
				}
			} catch (error) {
				console.error("Failed to check user's lists", error);
			}
		};
		checkLists();
	}, [movie.imdbId]);

	const handleClick = async (type) => {
		const accessToken = localStorage.getItem('accessToken');
		const url = `http://localhost:8000/api/titles/${type}/${movie.imdbId}`;
		const headers = { Authorization: `Bearer ${accessToken}` };
		const isCurrentlyActive = type === 'favorite' ? isFavorite : isWatchLater;
		const setState = type === 'favorite' ? setIsFavorite : setIsWatchLater;

		try {
			if (isCurrentlyActive) {
				// If it's active, we send a DELETE request to remove it
				await axios.delete(url, { headers });
				setState(false);
			} else {
				// If it's not active, we send a POST request to add it
				await axios.post(url, {}, { headers });
				setState(true);
			}
		} catch (error) {
			console.error(`Failed to update ${type} list`, error);
		}
	};

	const posterUrl = movie.poster_path
		? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
		: 'https://placehold.co/500x750/141414/E50914?text=No+Image';

	return (
		<article className='movie-card'>
			<div className='movie-card-image-container'>
				<img src={posterUrl} alt={movie.title} className='movie-card-image' />
				<div className='movie-card-actions'>
					<button
						className={`movie-card-action-btn ${isFavorite ? 'active' : ''}`}
						onClick={() => handleClick('favorite')}
					>
						<FontAwesomeIcon icon={faStar} />
					</button>
					<button
						className={`movie-card-action-btn ${isWatchLater ? 'active' : ''}`}
						onClick={() => handleClick('watchlater')}
					>
						<FontAwesomeIcon icon={faClock} />
					</button>
				</div>
			</div>
			<div className='movie-card-info'>
				<h3 className='movie-card-title'>{movie.title}</h3>
				<p className='movie-card-description'>
					{movie.overview || 'No description available.'}
				</p>
				<div className='movie-card-genres'>
					{movie.genres?.slice(0, 2).map((genre) => (
						<span key={genre.id} className='movie-card-genre-tag'>
							{genre.name}
						</span>
					))}
				</div>
			</div>
		</article>
	);
};

export default MovieCard;
