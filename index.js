const axios = require('axios');
const cheerio = require('cheerio');

const url =
    "https://en.wikipedia.org/wiki/List_of_presidents_of_the_United_States";
const searchWord = "Lincoln";

const getWebScrape = async () => {
  try {
    const response = await axios.get(url);
    const $ = await cheerio.load(response.data);
    const body = $('body').text().toLowerCase();
    const searchTerm = searchWord.toLowerCase();
    //console.log(body);
    //console.log(typeof body);
    let matchingTerms = 0;

    body.split(" ").map((word) => {
      if (word.match(searchTerm)) {
        matchingTerms += 1;
      }
    })

    console.log(`There are ${matchingTerms} instances of ${searchTerm}`);


  } catch (error) {
    console.log(error);
  }

}

getWebScrape();
