const axios = require('axios');
const cheerio = require('cheerio');

const searchThoughTerms = (body, searchTerm) => {
    let matchingTerms = 0;

    body.split(" ").map((word) => {
        if (word.match(searchTerm)) {
            matchingTerms += 1;
        }
    });

    return matchingTerms;
};

const getWebScrape = async (url, query) => {
    try {
        const corsURL = "https://cors-anywhere.herokuapp.com/" + url;
        const response = await axios.get(corsURL);
        const $ = await cheerio.load(response.data);
        const body = $("body").text().toLowerCase();
        const searchTerm = query.toLowerCase();
        searchThoughTerms(body, searchTerm);
    } catch (error) {
        console.log(error);
    }
};


const main = async(event) =>{
  const {queryStringParameters: {
    url, query
  }} = event  
  getWebScrape(url, query)
}

exports.handler = main;
