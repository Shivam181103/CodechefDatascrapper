const request = require("request");
const cheerio = require("cheerio");
const link = "https://www.codechef.com/users/";

let input = process.argv.slice(2);
let userName = input[0];

const url = link+userName;
console.log("Scrapping The Data .......")
request(url,cb);

function cb(error, response ,html){
    if(error){
       console.log("error");
    }else if(response.statusCode==404){
        console.log("Page Not Found");
    }else{
        getDetails(html);
    }
}

function getDetails(html){

    let $ = cheerio.load(html);
    let name = $(".h2-style");
    let starCount=$(".side-nav .rating");
    let country =$(".side-nav .user-country-name");
    let ratings =$(".rating-number");
    let ranks =$(".inline-list>li>a>strong");
    let globalRank = $(ranks[0]).text();
    let countryRank = $(ranks[1]).text();
    let problems = $(".content>h5");
    let fullySolved =$(problems[0]).text();
    let partiallySolved =$(problems[1]).text();

   let fullData = `
   Name: ${name.text()}
   Stars: ${starCount.text()}
   Country: ${country.text()}
   CurrentRating: ${ratings.text()}
   GlobalRank: ${globalRank}
   CountryRank: ${countryRank}
   ${fullySolved}
   ${partiallySolved}
   `
   
   console.log(fullData);
   
    
}