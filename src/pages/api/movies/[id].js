import { fetcher } from '../../../../utils/api';

const getMovieUrl = (id) =>
  `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`;

const getMovieVideos = (id) =>
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}`

async function getTrailer(id) {
  const {results} = await fetcher(getMovieVideos(id));
  for(let i = 0; i < results.length; i++) {
    if(results[i].type === "Trailer" && results[i].site === "YouTube") {
      return results[i].key;
    }
  }
}

export default async function handler(req, res) {
  const movie = await fetcher(getMovieUrl(req.query.id));
  movie.trailer = await getTrailer(req.query.id)
  res.status(200).json(movie);
}
