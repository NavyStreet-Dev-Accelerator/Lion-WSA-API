const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = async (event) => {
    const { queryStringParameters } = event;
    try {
        const res = await axios.get(queryStringParameters.url);
        const $ = await cheerio.load(res.data);
        const body = $("body").text().toLowerCase();

        let matchingTerms = 0;
        const searchTerm = queryStringParameters.query.toLowerCase();
        body.split(" ").map((word) => {
            if (word.match(searchTerm)) {
                matchingTerms += 1;
            }
        });

        return {
            statusCode: 200,
            body: matchingTerms,
        };
    } catch (e) {
        console.log(e);
        return {
            statusCode: 400,
            body: e.message,
        };
    }
};
