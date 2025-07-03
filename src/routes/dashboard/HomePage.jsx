import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MovieCard from '../../components/movies/MovieCard';
import Filter from '../../components/movies/Filter';
import Button from '../../components/general/Button';
import './dashboard.css';

const HomePage = () => {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const [minYear, setMinYear] = useState(1970);
	const [maxYear, setMaxYear] = useState(2022);
	const [genres, setGenres] = useState([]);
	const [sort, setSort] = useState('latest');
	const [title, setTitle] = useState('');

	const loadMovies = useCallback(
		async (currentPage, shouldAppend = false) => {
			setIsLoading(true);
			try {
				const accessToken = localStorage.getItem('accessToken');
				const response = await axios.get(
					'http://localhost:8000/api/titles/advancedsearch',
					{
						headers: { Authorization: `Bearer ${accessToken}` },
						params: {
							page: currentPage,
							minYear,
							maxYear,
							genre: genres.length > 0 ? genres.join(',') : undefined,
							title: title || undefined,
							sort,
						},
					}
				);
				setMovies((prevMovies) =>
					shouldAppend ? [...prevMovies, ...response.data] : response.data
				);
			} catch (error) {
				console.error('Failed to load movies:', error);
			} finally {
				setIsLoading(false);
			}
		},
		[minYear, maxYear, genres, sort, title]
	);

	// Effect for initial load and when filters change
	useEffect(() => {
		setPage(1);
		loadMovies(1, false); // Don't append on filter change
	}, [loadMovies]);

	const handleLoadMore = () => {
		const nextPage = page + 1;
		setPage(nextPage);
		loadMovies(nextPage, true); // Append new movies
	};

	return (
		<div className='dashboard-page'>
			<Filter
				minYear={minYear}
				setMinYear={setMinYear}
				maxYear={maxYear}
				setMaxYear={setMaxYear}
				sort={sort}
				setSort={setSort}
				genres={genres}
				setGenres={setGenres}
				title={title}
				setTitle={setTitle}
			/>
			<div className='movies-grid'>
				{movies.map((movie) => (
					<MovieCard key={`${movie.imdbId}-${Math.random()}`} movie={movie} />
				))}
			</div>
			<div className='load-more-container'>
				<Button
					label={isLoading ? 'Loading...' : 'Load More..'}
					onClick={handleLoadMore}
					disabled={isLoading}
				/>
			</div>
		</div>
	);
};

export default HomePage;
