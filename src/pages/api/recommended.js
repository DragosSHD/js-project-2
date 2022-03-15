import { fetcher } from '../../../utils/api';
import dbConnect from "../../../utils/dbConnect";
import History from "../../../models/History";


const getRecommendationForId = (id) =>
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.TMDB_API_KEY}`;

export default async function handler(req, res) {
    await dbConnect();

    // Take the last movie added to history.
    const seenMovies = await History.find().sort({'date': -1}).limit(1);

    const {results} = await fetcher(getRecommendationForId(seenMovies[0].id));

    if(results)
        res.status(200).json(results);

    res.status(400).end();
}