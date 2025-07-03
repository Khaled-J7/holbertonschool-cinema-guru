import React from 'react';
import SearchBar from '../general/SearchBar';
import Input from '../general/Input';
import SelectInput from '../general/SelectInput';
import Tag from './Tag';
import './movies.css';

const Filter = ({
	minYear,
	setMinYear,
	maxYear,
	setMaxYear,
	sort,
	setSort,
	genres,
	setGenres,
	title,
	setTitle,
}) => {
	const sortOptions = [
		{ value: 'latest', label: 'Latest' },
		{ value: 'oldest', label: 'Oldest' },
		{ value: 'highestrated', label: 'Highest Rated' },
		{ value: 'lowestrated', label: 'Lowest Rated' },
	];

	const availableGenres = [
		'action',
		'drama',
		'comedy',
		'biography',
		'romance',
		'thriller',
		'war',
		'history',
		'sport',
		'sci-fi',
		'documentary',
		'crime',
		'fantasy',
	];

	return (
		<div className='filter-container'>
			<div className='filter-search'>
				<SearchBar title={title} setTitle={setTitle} />
			</div>
			<div className='filter-inputs'>
				<Input
					label='Min Date:'
					type='number'
					value={minYear}
					setValue={setMinYear}
				/>
				<Input
					label='Max Date:'
					type='number'
					value={maxYear}
					setValue={setMaxYear}
				/>
				<SelectInput
					label='Sort:'
					options={sortOptions}
					value={sort}
					setValue={setSort}
				/>
			</div>
			<div className='filter-genres'>
				<ul className='filter-genres-list'>
					{availableGenres.map((genre) => (
						<Tag
							key={genre}
							genre={genre}
							genres={genres}
							setGenres={setGenres}
						/>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Filter;
