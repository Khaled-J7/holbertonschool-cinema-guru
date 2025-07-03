import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../../components/movies/MovieCard';
import './dashboard.css';

const WatchLater = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const fetchWatchLater = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken');
				const response = await axios.get(
					'http://localhost:8000/api/titles/watchlater/',
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				setMovies(response.data);
			} catch (error) {
				console.error('Failed to fetch watch later movies:', error);
			}
		};

		fetchWatchLater();
	}, []);

	return (
		<div className='dashboard-page'>
			<h1 className='page-title'>Movies to Watch Later</h1>
			<div className='movies-grid'>
				{movies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</div>
		</div>
	);
};

export default WatchLater;
