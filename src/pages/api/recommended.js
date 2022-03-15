import { fetcher } from '../../../utils/api';
import dbConnect from "../../../utils/dbConnect";
import History from "../../../models/History";
import Watchlist from "../../../models/Watchlist";


const getRecommendationForId = (id) =>
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.TMDB_API_KEY}`;

const getPopularMovies = () =>
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`;

async function removeSeenMovies(recommended) {

    const seenMovies = await History.find();
    const watchListMovies = await Watchlist.find();
    const outMovies = [];

    for(let i = 0; i < recommended.length; i++) {
        const crtMovie = recommended[i];
        if(!seenMovies.find(movie => movie.id === crtMovie.id) &&
            !watchListMovies.find(movie => movie.id === crtMovie.id)) {
            outMovies.push(crtMovie);
        }
    }

    return outMovies;
}

// Return a movie recommendations based on the last movie added to history
// or a list of popular movies.
export default async function handler(req, res) {
    await dbConnect();

    // Take the last movie added to history.
    const seenMovies = await History.find().sort({'date': -1}).limit(1);

    if(seenMovies.length) {
        const {results} = await fetcher(getRecommendationForId(seenMovies[0].id));
        if(results) {
            const filteredRes = await removeSeenMovies(results);
            res.status(200).json(filteredRes);
        }
    } else {
        const {results} = await fetcher(getPopularMovies());
        if(results)
            res.status(200).json(results);
    }


    res.status(400).end();
}