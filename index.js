const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (event) => {

    const { queryStringParameters } = event;

    try {
        const res = await axios.get(queryStringParameters.url);
        const $ = await cheerio.load(res.data);
        const body = $("body").text().toLowerCase();

        const searchTerm = queryStringParameters.query.toLowerCase();
        const matches = Array.from(body.matchAll(`${searchTerm}`));
        const matchesLength = matches.length;

        return {
            statusCode: 200,
            body: matchesLength
        };
    } catch (e) {
        console.log(e);
        return {
            statusCode: 400,
            body: e.message
        };
    }
};