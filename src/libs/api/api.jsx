import React, { useState, useEffect } from 'react';

const MovieList = () => {
  const [movies, setMovies] = useState([]); // State to store the movies
  const [loading, setLoading] = useState(true); // State to handle loading status

  useEffect(() => {
    // Function to fetch movies
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=a37241f847697db472f3c7f222a20931');
        const data = await response.json();
        setMovies(data.results); // Set movies in state
        setLoading(false); // Set loading to false once the data is received
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false); // Ensure loading is false in case of error
      }
    };

    fetchMovies(); // Call the fetchMovies function
  }, []); // Empty dependency array means this effect runs only once after the initial render
 
  return (
    <div>
      {loading ? <p>Loading...</p> : (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              {movie.title} - {movie.release_date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieList;
