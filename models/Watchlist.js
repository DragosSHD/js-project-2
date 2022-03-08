import mongoose from 'mongoose';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
global.models = global.models || {};

global.models.Watchlist =
    global.models.Watchlist ||
    mongoose.model('Watchlist', {
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
    });

export default global.models.Watchlist;