import Watchlist from "../../../../models/Watchlist";
import dbConnect from '../../../../utils/dbConnect';

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    if( method === 'GET' ) {
        const movies = await Watchlist.find();
        res.json(movies);
    }
    res.status(400).end();
}


