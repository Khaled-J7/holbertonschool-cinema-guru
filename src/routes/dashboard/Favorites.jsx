import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../../components/movies/MovieCard';
import './dashboard.css';

const Favorites = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const fetchFavorites = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken');
				const response = await axios.get(
					'http://localhost:8000/api/titles/favorite/',
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				setMovies(response.data);
			} catch (error) {
				console.error('Failed to fetch favorite movies:', error);
			}
		};

		fetchFavorites();
	}, []);

	return (
		<div className='dashboard-page'>
			<h1 className='page-title'>Movies you like</h1>
			<div className='movies-grid'>
				{movies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</div>
		</div>
	);
};

export default Favorites;
